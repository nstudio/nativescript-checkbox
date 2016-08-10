import { Page } from 'ui/page';
import { Color } from 'color';
import { Observable } from 'data/observable';
import * as app from 'application';
import { CheckBox } from 'nativescript-checkbox';
import observableArrayModule = require("data/observable-array");

export class HelloWorldModel extends Observable {
  public data: observableArrayModule.ObservableArray<DataItem>;
  private _eventLabel: string;
  private _state: string;
  private _eventCount: number;

  constructor() {
    super();
    this._state = "";
    this._eventCount = 0;
    this.data = new observableArrayModule.ObservableArray<DataItem>();
    this.data.push(new DataItem("Brad Martin", false, "#eab557"));
    this.data.push(new DataItem("Nathan Walker", true, "#57bbed"));
    this.data.push(new DataItem("Steve McNiven-Scott", false, "#7559e7"));
    this.data.push(new DataItem("Ron Burgundy", true, "#eb5481"));
  }

    get eventLabel(): string {
        return this._eventLabel;
    }
    set eventLabel(value: string) {
        if (this._eventLabel !== value) {
            this._eventLabel = value;
            this.notifyPropertyChange("eventLabel", value)
        }
    }

    get state(): string {
        return this._state;
    }
    set state(value: string) {
        this._state = value;
        this.notifyPropertyChange("state", value);
    }

    public updateMessage(){
        this._eventCount++;
        this.eventLabel = "Triggered " + this._eventCount + " times";
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