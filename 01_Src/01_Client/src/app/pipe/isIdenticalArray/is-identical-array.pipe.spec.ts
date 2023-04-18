import { IsIdenticalArrayPipe } from './is-identical-array.pipe';

describe('IsIdenticalArrayPipe', () => {
  it('create an instance', () => {
    const pipe = new IsIdenticalArrayPipe();
    expect(pipe).toBeTruthy();
  });
});
