/// <reference path="BEMCheckBox.d.ts" /> Needed for autocompletion and compilation.

import {CheckBoxInterface} from "./checkbox";
import { View } from "ui/core/view";
import {ContentView} from "ui/content-view";
import { Property, PropertyChangeData } from "ui/core/dependency-observable";
import { PropertyMetadata } from "ui/core/proxy";
import {Color} from "color";
import {Label} from "ui/label";
import {Button} from "ui/button";
import {StackLayout} from "ui/layouts/stack-layout";
import style = require("ui/styling/style");


declare var CGRectMake: any, CGPointMake: any;

export class CheckBox extends Button implements CheckBoxInterface {
  public static checkedProperty = new Property("checked", "CheckBox", new PropertyMetadata(false));

  private _iosCheckbox: BEMCheckBox;
  private _delegate: BEMCheckBoxDelegateImpl;
  private _checked: boolean;
  private _fillColor: string = "#0075ff";
  private _tintColor: string = "#0075ff";
  private _lineWidth: number;
  private _hideBox: boolean;
  private _boxType: number;
  private _tint: string;
  private _onCheckColor: string;
  private _animationDuration: number;
  private _onAnimationType: number;
  private _offAnimationType: number;

  constructor() {
    super();

    // just create with any width/height as XML view width/height is undefined at this point
    // we modify width/height later below in onLoaded
    this._onCheckColor = "#ffffff";
    this._fillColor = "#0075ff";
    this._tintColor = "#0075ff";
    this._onAnimationType = 2;
    this._offAnimationType = 2;
    
    this._iosCheckbox = <BEMCheckBox>BEMCheckBox.alloc().initWithFrame(CGRectMake(0, 0, 21, 21));
    this._delegate = BEMCheckBoxDelegateImpl.initWithOwner(new WeakRef(this));
  }  

  get checked(): boolean {
      return this._getValue(CheckBox.checkedProperty);
  }
  set checked(value: boolean) {
    this._setValue(CheckBox.checkedProperty, value);
  }

  set fillColor(color: string) {
      this._iosCheckbox.onFillColor = new Color(color).ios;
      this._fillColor = color;
  }

  set tintColor(color: string) {
      this._tintColor = color;
      this._iosCheckbox.onTintColor = new Color(color).ios;
  }

  /* NATIVE PROPERTIES */
  set checkedAnimated(value: boolean) {
    if (this._iosCheckbox)
      this._iosCheckbox.setOnAnimated(value, true);
  }

  set lineWidth(value: number) {
    if (this._iosCheckbox)
      this._iosCheckbox.lineWidth = value;
    else
      this._lineWidth = value;
  }

  set hideBox(value: boolean) {
    if (this._iosCheckbox)
      this._iosCheckbox.hideBox = value;
    else
      this._hideBox = value;
  }

  set boxType(value: number) {
    let type = BEMBoxType.Circle;
    if (value === 2) {
      type = BEMBoxType.Square;
    }
    if (this._iosCheckbox)
      this._iosCheckbox.boxType = type;
    else
      this._boxType = value;
  }

  set tint(color: string) {
    if (this._iosCheckbox)
      this._iosCheckbox.tintColor = new Color(color).ios;
    else
      this._tint = color;
  }

  set onCheckColor(color: string) {
    if (this._iosCheckbox)
      this._iosCheckbox.onCheckColor = new Color(color).ios;
    else
      this._onCheckColor = color;
  }

  set animationDuration(value: number) {
    if (this._iosCheckbox)
      this._iosCheckbox.animationDuration = value;
    else
      this._animationDuration = value;
  }

  set onAnimationType(value: number) {
    if (this._iosCheckbox)
      this._iosCheckbox.onAnimationType = this.getAnimationType(value);
    else
      this._onAnimationType = value;
  }

  set offAnimationType(value: number) {
    if (this._iosCheckbox)
      this._iosCheckbox.offAnimationType = this.getAnimationType(value);
    else
      this._offAnimationType = value;
  }

  get nativeiOSCheckBox() {
    return this._iosCheckbox;
  }

  public reload(value: boolean) {
    this._iosCheckbox.reload();
  }
  /* END NATIVE PROPERTIES */


  public onLoaded() {
    super.onLoaded();

    var fontSize = this.style.fontSize;
    this._iosCheckbox.delegate = this._delegate;

    //Positioning
    this._iosCheckbox.frame = CGRectMake(0,0,fontSize,fontSize);
    this._iosCheckbox.center = CGPointMake( this._iosCheckbox.center.x, (fontSize / 2) + 3);
    
    this.style.paddingLeft = fontSize + (fontSize > 20 ? 10 : 5);
    this.style.textAlignment = "left";

    this.ios.addSubview(this._iosCheckbox);

    this._iosCheckbox.on = this.checked;


    //Allow label click to change the textbox
    this.addEventListener("tap", function(args){
        var checkbox = <CheckBox>args.object;
        checkbox.checked = !checkbox.checked;
    });    
    
    if (typeof this._lineWidth !== 'undefined') {
      this.lineWidth = this._lineWidth;
    }
    if (typeof this._hideBox !== 'undefined') {
      this.hideBox = this._hideBox;
    }
    if (typeof this._boxType !== 'undefined') {
      this.boxType = this._boxType;
    }
    if (typeof this._tint !== 'undefined') {
      this.tint = this._tint;
    }
    if (typeof this._onCheckColor !== 'undefined') {
      this.onCheckColor = this._onCheckColor;
    }
    if (typeof this._fillColor !== 'undefined') {
      this.fillColor = this._fillColor;
    }
    if (typeof this._tintColor !== 'undefined') {
      this.tintColor = this._tintColor;
    }
    if (typeof this._animationDuration !== 'undefined') {
      this.animationDuration = this._animationDuration;
    }
    if (typeof this._onAnimationType !== 'undefined') {
      this.onAnimationType = this._onAnimationType;
    }
    if (typeof this._offAnimationType !== 'undefined') {
      this.offAnimationType = this._offAnimationType;
    }
  }

  public onUnloaded() {
        this._iosCheckbox.delegate = null;
        super.onUnloaded();
    }


  public toggle(){
    this.checked = !this.checked;
  }

  private getAnimationType(value: number) {
    switch (value) {
      case 1:
        return BEMAnimationType.Stroke;
      case 2:
        return BEMAnimationType.Fill;
      case 3:
        return BEMAnimationType.Bounce;
      case 4:
        return BEMAnimationType.Flat;
      case 5:
        return BEMAnimationType.Stroke;
      case 6:
        return BEMAnimationType.Fade;
    }
  }

  public _onCheckedPropertyChanged(data: PropertyChangeData) {
    console.log("_onCheckedPropertyChanged to " + data.newValue);
      debugger;
      if(this._iosCheckbox){
            this._iosCheckbox.setOnAnimated(data.newValue, true);
      }
  }
}

function onCheckedPropertyChanged(data: PropertyChangeData) {
  console.log("onCheckedPropertyChanged to " + data.newValue);
  debugger;
    var checkbox = <CheckBox>data.object;
    checkbox._onCheckedPropertyChanged(data);
}


// register the setNativeValue callbacks
(<PropertyMetadata>CheckBox.checkedProperty.metadata).onSetNativeValue = onCheckedPropertyChanged;


class BEMCheckBoxDelegateImpl extends NSObject implements BEMCheckBoxDelegate {
    public static ObjCProtocols = [BEMCheckBoxDelegate];
    /*public static ObjCExposedMethods = {
        "didTapCheckBox": { returns: interop.types.void, params: [NSObject] }
    };*/

    private _owner: WeakRef<CheckBox>;

    public static initWithOwner(owner: WeakRef<CheckBox>): BEMCheckBoxDelegateImpl {
        let delegate = <BEMCheckBoxDelegateImpl>BEMCheckBoxDelegateImpl.new();
        delegate._owner = owner;
        return delegate;
    }

    public animationDidStopForCheckBox(checkBox: BEMCheckBox): void {
        //TODO: Maybe trigger event later?
    }

    public didTapCheckBox(checkBox: BEMCheckBox): void {
      let owner = this._owner.get();
        if (owner) {
                console.log("delegate check " + checkBox.on);
            owner._onPropertyChangedFromNative(CheckBox.checkedProperty, checkBox.on);
        }
    }
}

export class CheckBoxStyler implements style.Styler {
    private static setBorderColorProperty(view: any, newValue: any) {  
        if (view.nativeiOSCheckBox){
          var color = new Color(newValue);
          console.log("setBorderColorProperty to "+ color);
            view.nativeiOSCheckBox.tintColor = color.ios;
        }
    }

  private static setBorderWidthProperty(view: any, newValue: any) {  
        if (view.nativeiOSCheckBox){
            view.nativeiOSCheckBox.lineWidth = newValue;
        }
    }

    private static resetColorProperty(view: View, nativeValue: number) {
        // Do nothing.
    }

    public static registerHandlers() {
        style.registerHandler(style.borderColorProperty, new style.StylePropertyChangedHandler(CheckBoxStyler.setBorderColorProperty, CheckBoxStyler.resetColorProperty), "CheckBox");
        style.registerHandler(style.borderWidthProperty, new style.StylePropertyChangedHandler(CheckBoxStyler.setBorderWidthProperty, CheckBoxStyler.resetColorProperty), "CheckBox");

        style.registerHandler(style.borderRadiusProperty, style.ignorePropertyHandler, "CheckBox");
    }
}

CheckBoxStyler.registerHandlers();