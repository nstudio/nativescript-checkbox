import { Page } from 'ui/page';
import { Color } from 'color';
import { Observable } from 'data/observable';
import * as app from 'application';
import { CheckBox } from 'nativescript-checkbox';
import observableArrayModule = require("data/observable-array");

export class HelloWorldModel extends Observable {
  public data: Array<DataItem>;

  constructor() {
    super();
    this.data = new Array<DataItem>();
    this.data.push(new DataItem("Item 1", false));
    this.data.push(new DataItem("Item 2", true));
    this.data.push(new DataItem("Item 3", false));
    this.data.push(new DataItem("Item 4", true));
    this.data.push(new DataItem("Item 5", false));
    this.data.push(new DataItem("Item 6", false));
    this.data.push(new DataItem("Item 7", false));
    this.data.push(new DataItem("Item 8", false));
  }
}

export class DataItem{
  constructor(text: string, checked: boolean){
    this.text = text;
    this.checked = checked;
  }

  public text: string;
  public checked: boolean;
}