import { Page } from 'ui/page';
import { Color } from 'color';
import { Observable } from 'data/observable';
import * as app from 'application';
import { CheckBox } from 'nativescript-checkbox';

export class HelloWorldModel extends Observable {
  public checkProp: boolean;
  public myCheckText: string;
  public myCheckColor: string;
  private _myCheckbox: any;

  constructor(mainPage: Page) {
    super();
    this.checkProp = false;
    this.myCheckText = 'Remember Me?';
    this.myCheckColor = '#3489db';
    this._myCheckbox = <any>mainPage.getViewById('myCheckbox');
  }

  public toggleCheck() {
    if (this._myCheckbox.checked === true) {
      if (app.ios) {
        this._myCheckbox.checkedAnimated = false;
      } else {
        this._myCheckbox.checked = false;
      }
      this.set('myCheckText', 'Remember Me?');
      this.set('myCheckColor', '#ff4801');
    } else {
      if (app.ios) {
        this._myCheckbox.checkedAnimated = true;
      } else {
        this._myCheckbox.checked = false;
      }
      this.set('myCheckText', 'That\'s better :)');
      this.set('myCheckColor', '#009688');
    }
  }


}