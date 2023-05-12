/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-03-22 11:15:20                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2023-05-12 15:48:10                              *
 ****************************************************************************/

import { Component, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { CommentInterface } from 'src/app/services/project-list/project-list.service';
import { UserService } from 'src/app/services/user/user.service';


import EditorJS from "@editorjs/editorjs";
import Header from '@editorjs/header';
// @ts-ignore
import CodeTool from "@editorjs/code";
// @ts-ignore
import Table from '@editorjs/table';
// @ts-ignore
import CheckList from '@editorjs/checklist';
// @ts-ignore
import Delimiter from '@editorjs/delimiter';
// @ts-ignore
import NestedList from '@editorjs/nested-list';
// @ts-ignore
import Image from '@editorjs/image';
// @ts-ignore
import Embed from '@editorjs/embed';
// @ts-ignore
import InlineCode from '@editorjs/inline-code';
// @ts-ignore
import Underline from '@editorjs/underline';
// @ts-ignore
import edjsParser from 'editorjs-parser';

@Component({
  selector: 'app-comments-section',
  templateUrl: './comments-section.component.html',
  styleUrls: ['./comments-section.component.scss']
})
export class CommentsSectionComponent {
  editor: any;
  parser = new edjsParser();

  constructor(private api: ApiService) {
    this.editor = new EditorJS( {
      holder: 'editor-js',
      placeholder: 'Write your comment...',
      inlineToolbar: ['bold', 'italic', 'underline', 'inlineCode'],
      tools: {
        header: Header,
        code: CodeTool,
        table: Table,
        delimiter: Delimiter,
        checklist: CheckList,
        embed: Embed,
        underline: Underline,
        inlineCode: {
          class: InlineCode,
          inlineToolbar: true,
          shortcut: 'CMD+SHIFT+M',
        },
        list: {
          class: NestedList,
          inlineToolbar: true,
          config: {
            defaultStyle: 'unordered'
          },
        },
        image: {
          class: Image,
          config: {
            endpoints: {
              byUrl: 'http://localhost:5000/api/files', // Your backend file uploader endpoint
            },
            uploader: {
              uploadByFile(file: File) {
                let token = UserService.isConnected() ? UserService.getUser().token : "";

                let requestHeaders: HeadersInit = new Headers();
                if (token)
                  requestHeaders.set('X-Token', token);

                var formdata = new FormData();
                formdata.append("file", file, file.name);
                var requestOptions = {
                  method: 'POST',
                  headers: requestHeaders,
                  body: formdata,
                };
                return new Promise((resolve, reject) => {
                  fetch("http://localhost:5000/api/files", requestOptions)
                  .then(response => {
                    return response.json();
                  })
                  .then(json => {
                    console.log(json);
                    resolve({
                      success: 1,
                      file: {
                        url: "http://localhost:5000/" + json.path
                      }
                    })
                  })
                  .catch(err => reject(err))
                })
              }
            }
          }
        }
      }
    });
  }

  @Input() comments: Array<CommentInterface> = [];

  @Input() targetType: string = "";
  @Input() targetId: string = "";

  @Input() onEdit: boolean = false;

  public newCommentContent: string = "";

  /**
  * @name newComment
  * @descr POST new comment on Api then add it to the comments List
  *
  */
  public newComment(): void {
    let path = this.targetType+"/"+this.targetId+"/comments"
    this.api.request("POST", path, { content: this.newCommentContent} )
    .then((ret: any) => {
      this.comments.push(ret)
    })
  }
  /***/


  public onSave():void {
    this.editor
      .save()
      .then((outputData: any) => {
        let path = this.targetType+"/"+this.targetId+"/comments"
        this.api.request("POST", path, { content: JSON.stringify(outputData)} )
        .then((ret: any) => {
          this.comments.push(ret);
          this.editor.clear();
        })
      })
      .catch((err: any) => {
        console.error(err);
      });
  }
}
