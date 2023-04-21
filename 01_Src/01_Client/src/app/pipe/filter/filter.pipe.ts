/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-04-15 14:59:18                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-04-15 16:07:09                               *
 *****************************************************************************/

import { Pipe, PipeTransform } from '@angular/core';

import { LabelsInterface } from 'src/app/services/project-list/project-list.service';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(items: Array<LabelsInterface>, labels: Array<LabelsInterface>): any[] {

    if (!items || !labels || labels.length === 0) {
      return items;
    }
    const idRes: Array<string> = items.map((label: LabelsInterface) => typeof label.id !== 'undefined' ? label.id : '');
    const idLabels: Array<string> = labels.map((label: LabelsInterface) => label.id ? label.id : '');
    const idNotSame: Array<string> = idRes.filter(id => !idLabels.includes(id));

    return items.filter((label: LabelsInterface) => label.id && idNotSame.includes(label.id)).concat(labels.filter((label: LabelsInterface) => label.id && idNotSame.includes(label.id)));
  }

}
