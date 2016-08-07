import { Page } from 'ui/page';
import { Color } from 'color';
import { Observable } from 'data/observable';
import * as app from 'application';
import { CheckBox } from 'nativescript-checkbox';
import observableArrayModule = require("data/observable-array");

export class HelloWorldModel extends Observable {
  public data: observableArrayModule.ObservableArray<DataItem>;
  public check1: DataItem;
  public check2: DataItem;
  public check3: DataItem;


  constructor() {
    super();
    this.data = new observableArrayModule.ObservableArray<DataItem>();
    this.data.push(new DataItem("Brad Martin", false, "#eab557"));
    this.data.push(new DataItem("Nathan Walker", true, "#57bbed"));
    this.data.push(new DataItem("Steve McNiven-Scott", false, "#7559e7"));
    this.data.push(new DataItem("Ron Burgundy", true, "#eb5481"));
  }
}

export class DataItem{
  constructor(text: string, checked: boolean, color?: string){
    this.text = text;
    this.checked = checked;

    if(color){
      this.color = color;
    }
  }

  public text: string;
  public checked: boolean;
  public color: string;
}