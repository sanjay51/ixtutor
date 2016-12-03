import { Injectable } from '@angular/core';

@Injectable()
export class UIInteractionService {
  uiSwitches = {
    showFooter: true
  }

  constructor() { }

  hideFooter() {
    this.uiSwitches.showFooter = false;
  }

  unhideFooter() {
    this.uiSwitches.showFooter = true;
  }

  isFooterVisible(): boolean {
    return this.uiSwitches.showFooter;
  }

}
