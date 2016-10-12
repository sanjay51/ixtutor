import { Ixtutor2Page } from './app.po';

describe('ixtutor2 App', function() {
  let page: Ixtutor2Page;

  beforeEach(() => {
    page = new Ixtutor2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
