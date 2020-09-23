import {
  confirm,
  Observable,
  ObservableArray,
  Utils,
} from '@nativescript/core';

export class HelloWorldModel extends Observable {
  public data: ObservableArray<DataItem>;
  public uberData: ObservableArray<DataItem>;
  private _eventLabel: string = 'Click text or checkbox';
  private _state: string;
  private _eventCount: number;
  public status: boolean = false;
  constructor() {
    super();
    this._state = '';
    this._eventCount = 0;
    this.data = new ObservableArray<DataItem>();
    this.data.push(new DataItem('Brad Martin', false, '#eab557'));
    this.data.push(new DataItem('Nathan Walker', true, '#57bbed'));
    this.data.push(new DataItem('Steve McNiven-Scott', false, '#7559e7'));
    this.data.push(new DataItem('Ron Burgundy', true, '#eb5481'));

    this.uberData = new ObservableArray<DataItem>();
    // Copy\paste ...hacky I know, dont have time to make this elegant atm :)
    this.uberData.push(new DataItem('Brad Martin', false, '#eab557'));
    this.uberData.push(new DataItem('Nathan Walker', true, '#57bbed'));
    this.uberData.push(new DataItem('Steve McNiven-Scott', false, '#7559e7'));
    this.uberData.push(new DataItem('Ron Burgundy', true, '#eb5481'));

    this.uberData.push(new DataItem('Brad Martin', false, '#eab557'));
    this.uberData.push(new DataItem('Nathan Walker', true, '#57bbed'));
    this.uberData.push(new DataItem('Steve McNiven-Scott', false, '#7559e7'));
    this.uberData.push(new DataItem('Ron Burgundy', true, '#eb5481'));

    this.uberData.push(new DataItem('Brad Martin', false, '#eab557'));
    this.uberData.push(new DataItem('Nathan Walker', true, '#57bbed'));
    this.uberData.push(new DataItem('Steve McNiven-Scott', false, '#7559e7'));
    this.uberData.push(new DataItem('Ron Burgundy', true, '#eb5481'));

    this.uberData.push(new DataItem('Brad Martin', false, '#eab557'));
    this.uberData.push(new DataItem('Nathan Walker', true, '#57bbed'));
    this.uberData.push(new DataItem('Steve McNiven-Scott', false, '#7559e7'));
    this.uberData.push(new DataItem('Ron Burgundy', true, '#eb5481'));

    this.uberData.push(new DataItem('Brad Martin', false, '#eab557'));
    this.uberData.push(new DataItem('Nathan Walker', true, '#57bbed'));
    this.uberData.push(new DataItem('Steve McNiven-Scott', false, '#7559e7'));
    this.uberData.push(new DataItem('Ron Burgundy', true, '#eb5481'));

    this.uberData.push(new DataItem('Brad Martin', false, '#eab557'));
    this.uberData.push(new DataItem('Nathan Walker', true, '#57bbed'));
    this.uberData.push(new DataItem('Steve McNiven-Scott', false, '#7559e7'));
    this.uberData.push(new DataItem('Ron Burgundy', true, '#eb5481'));

    this.uberData.push(new DataItem('Brad Martin', false, '#eab557'));
    this.uberData.push(new DataItem('Nathan Walker', true, '#57bbed'));
    this.uberData.push(new DataItem('Steve McNiven-Scott', false, '#7559e7'));
    this.uberData.push(new DataItem('Ron Burgundy', true, '#eb5481'));

    this.uberData.push(new DataItem('Brad Martin', false, '#eab557'));
    this.uberData.push(new DataItem('Nathan Walker', true, '#57bbed'));
    this.uberData.push(new DataItem('Steve McNiven-Scott', false, '#7559e7'));
    this.uberData.push(new DataItem('Ron Burgundy', true, '#eb5481'));

    this.uberData.push(new DataItem('Brad Martin', false, '#eab557'));
    this.uberData.push(new DataItem('Nathan Walker', true, '#57bbed'));
    this.uberData.push(new DataItem('Steve McNiven-Scott', false, '#7559e7'));
    this.uberData.push(new DataItem('Ron Burgundy', true, '#eb5481'));

    this.uberData.push(new DataItem('Brad Martin', false, '#eab557'));
    this.uberData.push(new DataItem('Nathan Walker', true, '#57bbed'));
    this.uberData.push(new DataItem('Steve McNiven-Scott', false, '#7559e7'));
    this.uberData.push(new DataItem('Ron Burgundy', true, '#eb5481'));

    this.uberData.push(new DataItem('Brad Martin', false, '#eab557'));
    this.uberData.push(new DataItem('Nathan Walker', true, '#57bbed'));
    this.uberData.push(new DataItem('Steve McNiven-Scott', false, '#7559e7'));
    this.uberData.push(new DataItem('Ron Burgundy', true, '#eb5481'));

    this.uberData.push(new DataItem('Brad Martin', false, '#eab557'));
    this.uberData.push(new DataItem('Nathan Walker', true, '#57bbed'));
    this.uberData.push(new DataItem('Steve McNiven-Scott', false, '#7559e7'));
    this.uberData.push(new DataItem('Ron Burgundy', true, '#eb5481'));
  }

  get eventLabel(): string {
    return this._eventLabel;
  }
  set eventLabel(value: string) {
    if (this._eventLabel !== value) {
      this._eventLabel = value;
      this.notifyPropertyChange('eventLabel', value);
    }
  }

  get state(): string {
    return this._state;
  }
  set state(value: string) {
    this._state = value;
    this.notifyPropertyChange('state', value);
  }

  public updateMessage(state) {
    this._eventCount++;
    this.eventLabel =
      'Triggered ' + this._eventCount + ' times, current state:' + state;
  }
  public changed() {
    console.log('changed');
  }

  public nStudioIconTap() {
    confirm({
      message:
        'nStudio, LLC. specializes in custom software applications ranging from mobile, web, desktop, server and more. Would you like to visit nstudio.io?',
      okButtonText: 'Yes',
      cancelButtonText: 'Close'
    }).then(result => {
      if (result) {
        Utils.openUrl('https://nstudio.io');
      }
    });
  }
}

export class DataItem {
  constructor(text: string, checked: boolean, color?: string) {
    this.text = text;
    this.checked = checked;

    if (color) {
      this.color = color;
    }
  }

  public text: string;
  public checked: boolean;
  public color: string;
}
