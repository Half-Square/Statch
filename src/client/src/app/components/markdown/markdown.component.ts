/* Imports */
import { Component, OnInit, Output, ViewChild, EventEmitter, Input, OnChanges, SimpleChanges } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { environment as env, environment } from "src/environments/environment";
/***/

/* Interfaces */
import { IComments, IProjects, ITasks, ITickets } from "src/app/interfaces";
/***/

/* Services */
import { RequestService } from "src/app/services/request.service";
import { UserService } from "src/app/services/user.service";
import { FormControl, FormGroup } from "@angular/forms";
/***/

/* Modules */
import { QuillEditorComponent } from "ngx-quill";
import "quill-mention";
import Quill from "quill";
import QuillImageDropAndPaste, { ImageData as QuillImageData } from "quill-image-drop-and-paste";
Quill.register("modules/imageDropAndPaste", QuillImageDropAndPaste);
/***/

@Component({
  selector: "component-markdown",
  templateUrl: "./markdown.component.html",
  styleUrls: ["./markdown.component.scss"]
})
export class MarkdownComponent implements OnInit, OnChanges {
  public form: FormGroup;
  @Output() getContent = new EventEmitter();
  @Input() hasPublish: boolean = false;
  @ViewChild(QuillEditorComponent, { static: true }) editor: QuillEditorComponent;

  modules = {
    toolbar: [
      [
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "code-block",
        { "header": 1 },
        { "header": 2 },
        { "list": "ordered"},
        { "list": "bullet" },
        { "indent": "-1"},
        { "indent": "+1" },
        { "color": [] },
        { "background": [] },
        { "align": [] },
        "clean",
        "link"
      ]
    ],
    mention: {
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      linkTarget: "_self",
      mentionDenotationChars: ["@", "#"],
      blotName: "styled-mention",
      // Dans la liste
      renderItem: (item: any, searchTerm: any): string => {
        return `<span>${item.value}</span>`;
      },
      source: function(searchTerm: any, renderList: any, mentionChar: any): any {
        const atValues = [
          { id: 1, value: "Fredrik Sundqvist", link: "https://www.google.com", target: mentionChar },
          { id: 2, value: "Patrik Sjölin", link: "https://www.google.com", target: mentionChar }
        ];
        const hashValues = [
          { id: 3, value: "Fredrik Sundqvist 2" },
          { id: 4, value: "Patrik Sjölin 2" }
        ];
        let values;

        if (mentionChar === "@") {
          values = atValues;
        } else {
          values = hashValues;
        }

        if (searchTerm.length === 0) {
          renderList(values, searchTerm);
        } else {
          const matches = [];
          for (let i = 0; i < values.length; i++)
            if (
              ~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())
            )
              matches.push(values[i]);
          renderList(matches, searchTerm);
        }
      },
      showDenotationChar: false
    },
    imageDropAndPaste: {
      handler: this.imageHandler.bind(this)
    }
  };

  constructor(private api: RequestService,
    private sanitizer: DomSanitizer,
    private user: UserService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["hasPublish"] &&
        !changes["hasPublish"].previousValue
        && changes["hasPublish"].currentValue === true) {
      this.form.reset();
    }
  }

  ngOnInit(): void {
    /* Import atrributors for better style & classname */
    let DirectionAttribute = Quill.import("attributors/attribute/direction");
    Quill.register(DirectionAttribute, true);
    let AlignClass = Quill.import("attributors/class/align");
    Quill.register(AlignClass, true);
    let BackgroundClass = Quill.import("attributors/class/background");
    Quill.register(BackgroundClass, true);
    let ColorClass = Quill.import("attributors/class/color");
    Quill.register(ColorClass, true);
    let DirectionClass = Quill.import("attributors/class/direction");
    Quill.register(DirectionClass, true);
    let FontClass = Quill.import("attributors/class/font");
    Quill.register(FontClass, true);
    let SizeClass = Quill.import("attributors/class/size");
    Quill.register(SizeClass, true);
    let AlignStyle = Quill.import("attributors/style/align");
    Quill.register(AlignStyle, true);
    let BackgroundStyle = Quill.import("attributors/style/background");
    Quill.register(BackgroundStyle, true);
    let ColorStyle = Quill.import("attributors/style/color");
    Quill.register(ColorStyle, true);
    let DirectionStyle = Quill.import("attributors/style/direction");
    Quill.register(DirectionStyle, true);
    let FontStyle = Quill.import("attributors/style/font");
    Quill.register(FontStyle, true);
    let SizeStyle = Quill.import("attributors/style/size");
    Quill.register(SizeStyle, true);
    const MentionBlot = Quill.import("blots/mention");
    /***/

    /**
     * Create new Blot for mention
     */
    class StyledMentionBlot extends MentionBlot {
      static render(data: any): any {
        const element = document.createElement("a");
        let prefix = data.target === "@" ? "@" : "#";
        element.innerText = prefix + data.value;
        element.style.color = data.color;
        element.href = data.link;
        return element;
      }
    }
    StyledMentionBlot["blotName"] = "styled-mention";

    Quill.register(StyledMentionBlot);
    /***/

    /**
     * Create form for output markdown
     */
    this.form = new FormGroup({
      text: new FormControl()
    });
    /***/
  }

  /**
   * Image handler for editor
   * @param dataUrl - Data's url (base64)
   * @param type - Datat's type (png, ...)
   * @param imageData - File's information
   */
  private imageHandler(dataUrl: string, type: string, imageData: QuillImageData): void {
    const file = imageData.toFile();

    if(file)
      this.fileUpload(file)
        .then((path) => {
          let index = (this.editor.quillEditor.getSelection() || {}).index;
          if (index === undefined || index < 0)
            index = this.editor.quillEditor.getLength();
          this.editor.quillEditor.insertEmbed(index, "image", environment.serverUrl + "/api/files/raw/" + path, "user");
        })
        .catch((err) => {
          return;
        });
  }
  /***/


  /**
 * File Upload to the server
 * @param file - File input
 * @returns - Url/Pah of file from server
 */
  private fileUpload(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      let form = new FormData();
      form.append("file", file);

      let headers: HeadersInit = new Headers();
      headers.set("x-token", this.user.getUser()?.token || "");

      fetch(`${env.serverUrl}/api/files`, {
        method: "POST",
        headers: headers,
        body: form
      }).then(async(res) => {
        let json = await res.json();
        return resolve(json.path);
      }).catch(err => {
        return reject(err);
      });
    });
  }
  /***/

  /**
  * Get content in dom
  * @return - Content string
  */
  public content(): void {
    this.getContent.emit(this.form.get("text")!.value);
  }
  /***/
}
