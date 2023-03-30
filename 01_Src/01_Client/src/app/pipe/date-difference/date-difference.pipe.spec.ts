/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : Invalid Date                                      *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-03-29 17:01:25                               *
 *****************************************************************************/

import { DateDifferencePipe } from '../date-difference/date-difference.pipe';

describe('DateDifferencePipe', () => {
  it('create an instance', () => {
    const pipe = new DateDifferencePipe();
    expect(pipe).toBeTruthy();
  });
});
