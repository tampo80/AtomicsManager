import { CompomentsModule } from './compoments.module';

describe('CompomentsModule', () => {
  let compomentsModule: CompomentsModule;

  beforeEach(() => {
    compomentsModule = new CompomentsModule();
  });

  it('should create an instance', () => {
    expect(compomentsModule).toBeTruthy();
  });
});
