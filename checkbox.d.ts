/**
 * Contains the CheckBox class, which represents a checkbox component.
 */
declare module "nativescript-checkbox" {
    import { View } from "ui/core/view";
    import { Property } from "ui/core/dependency-observable";

    /**
     * Represents a CheckBox component.
     */
    export class CheckBox extends View {

        /**
         * Represents the observable property backing the checked property of each Switch instance.
         */
        public static checkedProperty: Property;

        /**
         * Gets the native [android widget](https://developer.android.com/reference/android/widget/CheckBox.html) that represents the user interface for this component. Valid only when running on Android OS.
         */
        android: any /* android.widget.CheckBox */;

        /**
         * Gets or sets if a switch is checked or not.
         */
        checked: boolean;

        /**
         * Change the checked state of the view to the inverse of its current state.
         */
        toggle(): void;

    }

}