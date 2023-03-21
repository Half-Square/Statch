/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-03-20 16:49:53                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-03-20 16:50:01                               *
 *                                                                            *
 *****************************************************************************/

import { DirectivesModule } from './directives.module';

describe('DirectivesModule', () => {
  it('should create an instance', () => {
    const directive = new DirectivesModule();
    expect(directive).toBeTruthy();
  });
});
