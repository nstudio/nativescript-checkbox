import { View } from "ui/core/view";
/**
 * Represents a CheckBox component.
 */
export declare class CheckBox extends View {

    /**
     * Gets the native [android widget](https://developer.android.com/reference/android/widget/CheckBox.html) that represents the user interface for this component. Valid only when running on Android OS.
     */
    android: any /* android.widget.CheckBox */;

    /**
    * Gets the ios Label with the checkbox as a subview
    */
    ios: any /* Label */;

    /**
     * Gets or sets if a switch is checked or not.
     */
    checked: boolean;

    /**
     * Change the checked state of the view to the inverse of its current state.
     */
    toggle(): void;
    
    /**
     * String value used when hooking to the checked value change event.
     */
    public static changeEvent: string;

}

export interface CheckBoxInterface {
    text?: string;
    checked: boolean;
    fillColor: string;
    tintColor: string;
    toggle(): void;
}
