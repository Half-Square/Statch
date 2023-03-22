/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-02-23 10:48:38                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-02-23 10:48:38                               *
 *****************************************************************************/

import { PrismaService } from '../../prisma.service';
import { ConnectedGuard } from './connected.guard';

describe('ConnectedGuard', () => {
  it('should be defined', () => {
    expect(new ConnectedGuard(new PrismaService())).toBeDefined();
  });
});
