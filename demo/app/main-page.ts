import { CheckBox } from '@nstudio/nativescript-checkbox';
import { android } from 'tns-core-modules/application';
import { Color } from 'tns-core-modules/color';
import { EventData } from 'tns-core-modules/data/observable';
import { device, isAndroid } from 'tns-core-modules/platform';
import { Label } from 'tns-core-modules/ui/label';
import { Page } from 'tns-core-modules/ui/page';
import { DataItem, HelloWorldModel } from './main-view-model';

let page: Page;
let model: HelloWorldModel;

// Event handler for Page "loaded" event attached in main-page.xml
export function onNavigatedTo(args: EventData) {
  // Get the event sender
  page = args.object as Page;
  model = new HelloWorldModel();
  page.bindingContext = model;

  // Not related to checkboxes
  if (isAndroid && device.sdkVersion >= '21') {
    const window = android.startActivity.getWindow();
    window.setStatusBarColor(new Color('#3f3f3f').android);
  }
}

export function disabledTapTestCheck() {
  const tapTestCheck = page.getViewById('tapTestCheck') as CheckBox;
  tapTestCheck.isEnabled = !tapTestCheck.isEnabled;
}

export function onToggleTest(args) {
  console.log('toggle tap');
  const toggleTest = page.getViewById('toggleTest') as CheckBox;
  toggleTest.toggle();
}

export function onCustomCheckStateChange(args) {
  console.log('toggle enabled state tap');
  const toggleTest = page.getViewById('toggleTest') as CheckBox;
  toggleTest.isEnabled = !toggleTest.isEnabled;
}

export function onTapTest(args) {
  console.log('tap event test');
  const box = args.object as CheckBox;
  model.updateMessage(box.checked);
}

export function onRepeaterItemTap(args: any) {
  const label = <Label>page.getViewById('modelDumpLabel');
  const data = new Array<DataItem>();

  for (let i = 0; i < model.data.length; i++) {
    data.push(model.data.getItem(i));
  }

  label.text = JSON.stringify(data);
}
