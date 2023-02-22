import { ConnectedGuard } from './connected.guard';

describe('ConnectedGuard', () => {
  it('should be defined', () => {
    expect(new ConnectedGuard()).toBeDefined();
  });
});
