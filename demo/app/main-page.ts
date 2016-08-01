import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { isAndroid, device } from "platform";
import { Color } from "color";
import { android } from "application";
import { HelloWorldModel } from './main-view-model';

// Event handler for Page "loaded" event attached in main-page.xml
export function pageLoaded(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;
    page.bindingContext = new HelloWorldModel(page);
 
    if (isAndroid && device.sdkVersion >= "21") {
        let window = android.startActivity.getWindow();
        window.setStatusBarColor(new Color("#d32f2f").android);
    }
}