import { View } from "ui/core/view";
import { Color } from "color";
import { isAndroid, device } from "platform";
import { Property, PropertyChangeData } from "ui/core/dependency-observable";
import { PropertyMetadata } from "ui/core/proxy";
//import style = require("ui/styling/style");

declare var android: any;

export class CheckBox extends View {
    private _android: any; /// android.widget.CheckBox

    public static checkedProperty = new Property(
        "checked",
        "CheckBox",
        new PropertyMetadata(false)
    );

    public static textProperty = new Property(
        "text",
        "CheckBox",
        new PropertyMetadata(false)
    );


    get android() {
        return this._android;
    }

    get _nativeView() {
        return this._android;
    }

    get checked(): boolean {
        return this._getValue(CheckBox.checkedProperty);
    }
    set checked(value: boolean) {
        this._setValue(CheckBox.checkedProperty, value);
    }

    get text(): boolean {
        return this._getValue(CheckBox.textProperty);
    }
    set text(value: boolean) {
        this._setValue(CheckBox.textProperty, value);
    }


    public _createUI() {

        this._android = new android.widget.CheckBox(this._context, null);

        if (this.text) {
            this._android.setText(this.text);
        }

        var that = new WeakRef(this);

        this._android.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
            get owner() {
                return that.get();
            },

            onCheckedChanged: function (sender, isChecked) {
                if (this.owner) {
                    this.owner._onPropertyChangedFromNative(CheckBox.checkedProperty, isChecked);
                }
            }
        }));

    }

    public toggle(): void {
        this._android.toggle();
    }



}


function onCheckedPropertyChanged(data: PropertyChangeData) {
    var cBox = <CheckBox>data.object;
    if (!cBox.android) {
        return;
    }

    cBox.android.setChecked(data.newValue);
}

// register the setNativeValue callbacks
(<PropertyMetadata>CheckBox.checkedProperty.metadata).onSetNativeValue = onCheckedPropertyChanged;


function onTextPropertyChanged(data: PropertyChangeData) {
    var cBox = <CheckBox>data.object;
    if (!cBox.android) {
        return;
    }

    cBox.android.setText(data.newValue);
}

// register the setNativeValue callbacks
(<PropertyMetadata>CheckBox.textProperty.metadata).onSetNativeValue = onTextPropertyChanged;


/*
export class CheckBoxStyler implements style.Styler {
    private static setColorProperty(view: any, newValue: any) {        
        var cb = <android.widget.CheckBox>view._nativeView;
        if (cb) {            
            (<any>cb).setButtonTintList(android.content.res.ColorStateList.valueOf(new Color(newValue).android));
        }
    }

    private static resetColorProperty(view: View, nativeValue: number) {
        // Do nothing.
    }

    public static registerHandlers() {
        style.registerHandler(style.colorProperty, new style.StylePropertyChangedHandler(
            CheckBoxStyler.setColorProperty,
            CheckBoxStyler.resetColorProperty), "CheckBox");

        style.registerHandler(style.borderWidthProperty, style.ignorePropertyHandler, "CheckBox");
        style.registerHandler(style.borderColorProperty, style.ignorePropertyHandler, "CheckBox");
        style.registerHandler(style.borderRadiusProperty, style.ignorePropertyHandler, "CheckBox");
    }
}

CheckBoxStyler.registerHandlers();*/