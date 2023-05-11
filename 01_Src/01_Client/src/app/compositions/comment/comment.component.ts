/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-03-17 13:46:29                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2023-05-11 16:30:18                              *
 ****************************************************************************/

import { Component, Input, Output, AfterViewInit, EventEmitter, ViewChild, ElementRef } from '@angular/core';
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
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements AfterViewInit {
  editor: any;
  @ViewChild('test') el:ElementRef;

  constructor(private api: ApiService) {
    this.el = new ElementRef(null);
  }

  async ngAfterViewInit() {
    this.editor = new EditorJS( {
      readOnly: true,
      holder: await this.id,
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
      },
      data: await JSON.parse(this.content)
    });
  }

  public onDelete() {
    let path = "comments/" + this.id
    this.api.request("DELETE", path, {}).then(() => {
      this.editor.destroy()
    })
  }

  public actualUser = JSON.parse(sessionStorage.getItem("user")!)
  @Input() userId: string = "md";
  @Input() id: string = "test";
  @Input() name: string = "";
  @Input() lastName: string = "";
  @Input() email: string = "";
  @Input() imgPath: string = "";
  @Input() created: string = "";
  @Input() content: any = "";
}
