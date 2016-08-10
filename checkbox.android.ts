import {CheckBoxInterface} from "./checkbox";
import { View } from "ui/core/view";
import { Color } from "color";
import { isAndroid, device } from "platform";
import { Property, PropertyChangeData } from "ui/core/dependency-observable";
import { PropertyMetadata } from "ui/core/proxy";
import {Font} from "ui/styling/font";
import enums = require("ui/enums");
import style = require("ui/styling/style");

declare var android: any;

export class CheckBox extends View implements CheckBoxInterface {
    private _android: any; /// android.widget.CheckBox
    private _fillColor: string;

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

    constructor() {
        super();
    }

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

    get text(): string {
        return this._getValue(CheckBox.textProperty);
    }
    set text(value: string) {
        this._setValue(CheckBox.textProperty, value);
    }

    get fillColor() : string {
        return this._fillColor;
    }

    set fillColor(color: string) {
        this._fillColor = color;

        if(this._android)
            this._android.setButtonTintList(android.content.res.ColorStateList.valueOf(new Color(this._fillColor).android));
    }

    //There is no difference between tint and fill on the android widget
    get tintColor() : string {
        return this.fillColor;
    }

    set tintColor(color: string) {
        this.fillColor = color;
    }


    public _createUI() {

        this._android = new android.widget.CheckBox(this._context, null);

        if (this.text) {
            this._android.setText(this.text);
        }

        
        if(this._android){
            if(this.fillColor){
                //Set bound colors
                this._android.setButtonTintList(android.content.res.ColorStateList.valueOf(new Color(this._fillColor).android));
            }

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



export class CheckBoxStyler implements style.Styler {
    private static setColorLabelProperty(view: any, newValue: any) {        
        var cb = <android.widget.CheckBox>view._nativeView;
        if (cb) {            
            (<any>cb).setTextColor(new Color(newValue).android);
        }
    }

// font
    private static setFontInternalProperty(view: any, newValue: any, nativeValue?: any) {
        var tv = <android.widget.CheckBox>view._nativeView;
        var fontValue = <Font>newValue;

        var typeface = fontValue.getAndroidTypeface();
        if (typeface) {
            tv.setTypeface(typeface);
        }
        else {
            tv.setTypeface(nativeValue.typeface);
        }

        if (fontValue.fontSize) {
            tv.setTextSize(fontValue.fontSize);
        }
        else {
            tv.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, nativeValue.size);
        }
    }

    private static resetFontInternalProperty(view: any, nativeValue: any) {
        var tv: android.widget.CheckBox = <android.widget.CheckBox>view._nativeView;
        if (tv && nativeValue) {
            tv.setTypeface(nativeValue.typeface);
            tv.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, nativeValue.size);
        }
    }

    private static getNativeFontInternalValue(view: any): any {
        var tv: android.widget.TextView = <android.widget.CheckBox>view._nativeView;
        return {
            typeface: tv.getTypeface(),
            size: tv.getTextSize()
        };
    }
    private static resetColorProperty(view: View, nativeValue: number) {
        // Do nothing.
    }


    public static registerHandlers() {
        style.registerHandler(style.colorProperty, new style.StylePropertyChangedHandler(
            CheckBoxStyler.setColorLabelProperty,
            CheckBoxStyler.resetColorProperty), "CheckBox");

        style.registerHandler(style.fontInternalProperty, new style.StylePropertyChangedHandler(
            CheckBoxStyler.setFontInternalProperty,
            CheckBoxStyler.resetFontInternalProperty,
            CheckBoxStyler.getNativeFontInternalValue), "CheckBox");
/*
        style.registerHandler(style.backgroundColorProperty, new style.StylePropertyChangedHandler(
            CheckBoxStyler.setColorLabelProperty,
            CheckBoxStyler.resetColorProperty), "CheckBox");
            */

        style.registerHandler(style.borderWidthProperty, style.ignorePropertyHandler, "CheckBox");
        style.registerHandler(style.borderColorProperty, style.ignorePropertyHandler, "CheckBox");
        style.registerHandler(style.borderRadiusProperty, style.ignorePropertyHandler, "CheckBox");
    }
}

CheckBoxStyler.registerHandlers();