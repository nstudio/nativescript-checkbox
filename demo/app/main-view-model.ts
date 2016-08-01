import { Page } from 'ui/page';
import { Color } from 'color';
import { Observable } from 'data/observable';
import { CheckBox } from 'nativescript-checkbox';

export class HelloWorldModel extends Observable {
  public checkProp: boolean;
  public myCheckText: string;
  public myCheckColor: string;
  private _myCheckbox: CheckBox;

  constructor(mainPage: Page) {
    super();
    this.checkProp = false;
    this.myCheckText = 'Remember Me?';
    this.myCheckColor = '#3489db';
    this._myCheckbox = <CheckBox>mainPage.getViewById('myCheckbox');
  }

  public toggleCheck() {
    if (this._myCheckbox.checked === true) {
      this._myCheckbox.checked = false;
      this.set('myCheckText', 'Remember Me?');
      this.set('myCheckColor', '#ff4801');
    } else {
      this._myCheckbox.checked = true;
      this.set('myCheckText', 'That\'s better :)');
      this.set('myCheckColor', '#009688');
    }
  }


}