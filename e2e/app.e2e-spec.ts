import { Mwalab14Page } from './app.po';

describe('mwalab14 App', () => {
  let page: Mwalab14Page;

  beforeEach(() => {
    page = new Mwalab14Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
