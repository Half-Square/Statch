/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2024-01-23 11:56:09                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2024-01-23 15:27:20                               *
 *****************************************************************************/

import { Component, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommandsService } from 'src/app/services/commands.service';
import { PttService } from 'src/app/services/ptt.service';

@Component({
  selector: 'section-kaban',
  templateUrl: './kaban.section.html',
  styleUrls: ['./kaban.section.scss']
})
export class KabanSection {
  @Input() columns: {name: string, id: string, open: boolean}[];
  @Input() tasks: any;
  @Input() childsType: string;
  @Input() id: string;
  @Input() type: string;

  constructor(public command: CommandsService, public ptt: PttService) {}

  drop(event: CdkDragDrop<any[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const movedTask = event.previousContainer.data[event.previousIndex];
      movedTask.status = event.container.id;

      this.command.save(movedTask, this.childsType);

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
