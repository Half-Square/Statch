/*****************************************************************************
 * @Author                : Jbristhuille<jbristhuille@gmail.com>             *
 * @CreatedDate           : 2024-01-19 17:57:05                              *
 * @LastEditors           : Jbristhuille<jbristhuille@gmail.com>             *
 * @LastEditDate          : 2024-08-26 16:22:59                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Interfaces
  * Services
  * Modules
*/

/* Imports */
import {
  Component,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges

} from "@angular/core";
import { environment as env, environment } from "src/environments/environment";
/***/

/* Interfaces */
import { IUsers } from "src/app/interfaces";
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
import { RecoveryService } from "src/app/services/recovery.service";
Quill.register("modules/imageDropAndPaste", QuillImageDropAndPaste);
/***/

/* eslint-disable @typescript-eslint/no-explicit-any */
@Component({
  selector: "component-markdown",
  templateUrl: "./markdown.component.html",
  styleUrls: ["./markdown.component.scss"]
})
export class MarkdownComponent implements OnInit, OnChanges {
  public form: FormGroup;
  public users: IUsers[];
  public searchItems: [];
  @Input() hasDisabled: boolean = false;
  @Input() reset: boolean = true;
  @Output() getContent = new EventEmitter();
  @Input() hasPublish: boolean = false;
  @Input() placeholder: string;
  @Input() externContent: string;
  @ViewChild(QuillEditorComponent, { static: true }) editor: QuillEditorComponent;

  public modules = {};

  constructor(private api: RequestService,
    private recovery: RecoveryService,
    private user: UserService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["hasPublish"] && changes["hasPublish"].currentValue === true && this.reset === true) {
      this.form.reset();
    }
  }

  ngOnInit(): void {
    this.recovery.get("users").subscribe((users) => this.users = users);
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _ = this;
    this.modules = {
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
        source: function(searchTerm: string, renderList: any, mentionChar: any): any {
          let atUsers: {
            id: string;
            value: string;
            link: string;
            target: string;
          }[] = [];
          _.users.forEach((user: IUsers) => {
            atUsers.push({id: user.id, value: user.name, link: "/profile?id=" + user.id, target: "@"});
          });
          const hashValues: {
            id: string;
            value: string;
            link: string;
            target: string;
          }[] = [];
          let values;

          if (mentionChar === "@") {
            values = atUsers;
          } else {
            values = hashValues;
          }

          if (searchTerm.length === 0) {
            renderList(values, searchTerm);
          } else if (mentionChar === "@") {
            const matches = [];
            for (let i = 0; i < values.length; i++)
              if (
                ~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())
              )
                matches.push(values[i]);
            renderList(matches, searchTerm);
          } else if (mentionChar === "#") {
            const matches: {
              id: string;
              value: string;
              link: string;
              target: string;
            }[] = [];
            _.search(searchTerm).then((data) => {
              let datas = [];
              datas.push(...data.slice(0, 5));
              datas.forEach((data) => {
                matches.push({id: data.id, value: data.name, link: "/" + data.type + "s/" + data.id, target: "#"});
              });
              renderList(matches, searchTerm);
            });
          }
        },
        showDenotationChar: false
      },
      imageDropAndPaste: {
        handler: this.imageHandler.bind(this)
      }
    };
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
    const Image = Quill.import("formats/image");
    class ImageBlot extends Image {
      static create(value: any): any {
        const node = super.create(value);
        if (typeof value === "string") {
          node.setAttribute("src", this["sanitize"](value));
          node.setAttribute("alt", this["sanitize"](value).split("/").reverse()[0]);
        }
        return node;
      }
    }
    Quill.register(ImageBlot, true);
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

    Quill.register(StyledMentionBlot, true);
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
          this.editor.quillEditor.formatText(index, 1, "alt", file.name);
        })
        .catch((err) => {
          console.error(err);
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
  * Sends request to the demo dataverse API to retrieve search results for the given query.
  * @param query - The search query entered by the user.
  */
  private search(query: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.post("api/search", { query: query }, this.user.getUser()?.token)
        .then(data => {
          return resolve(data);
        })
        .catch(error => {
          console.error(error);
          return reject([]);
        });
    });
  }
  /***/

  /**
  * Get content in dom
  * @return - Content string
  */
  public content(): void {
    this.getContent.emit(this.form.get("text")?.value);
  }
  /***/
}
