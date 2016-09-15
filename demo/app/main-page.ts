import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { isAndroid, device } from "platform";
import { Color } from "color";
import { android } from "application";
import { HelloWorldModel } from './main-view-model';
import { DataItem } from './main-view-model';
import { CheckBox } from 'nativescript-checkbox';
import { Label } from 'ui/label';

let model: HelloWorldModel;
let page: Page;

// Event handler for Page "loaded" event attached in main-page.xml
export function pageLoaded(args: EventData) {
    // Get the event sender
     page = <Page>args.object;
     model = new HelloWorldModel();
     page.bindingContext = model;
 
    //Not related to checkboxes
    if (isAndroid && device.sdkVersion >= "21") {
        let window = android.startActivity.getWindow();
        window.setStatusBarColor(new Color("#363b58").android);
    }
}

export function onToggleTest(args){
    console.log("toggle tap")
    let toggleTest = <CheckBox>page.getViewById("toggleTest");
    toggleTest.toggle();
}

export function onTapTest(args){
    console.log("tap event test");
    let box = <CheckBox>args.object;
    model.updateMessage(box.checked);
}

export function onRepeaterItemTap(args: any){
    var label = <Label>page.getViewById("modelDumpLabel");
    let data = new Array<DataItem>();
    console.log(model.data.length);

    for(var i=0; i < model.data.length; i++){
        data.push(model.data.getItem(i));
    }

    label.text = JSON.stringify(data);
}