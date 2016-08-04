/// <reference path="BEMCheckBox.d.ts" /> Needed for autocompletion and compilation.

import {ContentView} from "ui/content-view";
import { Property, PropertyChangeData } from "ui/core/dependency-observable";
import { PropertyMetadata } from "ui/core/proxy";
import {Color} from "color";
import {Label} from "ui/label";
import {StackLayout} from "ui/layouts/stack-layout";
import {Style, properties as styleProps} from 'ui/styling';

declare var CGRectMake: any;

export class CheckBox extends ContentView{
  private _iosCheckbox: BEMCheckBox;
  private _iosLabel: UILabel;
  private _delegate: BEMCheckBoxDelegateImpl;
  private _checked: boolean;
  private _lineWidth: number;
  private _hideBox: boolean;
  private _boxType: number;
  private _tint: string;
  private _onCheckColor: string = "#ffffff";
  private _onFillColor: string = "#0075ff";
  private _onTintColor: string = "#0075ff";
  private _animationDuration: number;
  private _onAnimationType: number = 2;
  private _offAnimationType: number = 2;

  constructor() {
    super();

    // just create with any width/height as XML view width/height is undefined at this point
    // we modify width/height later below in onLoaded
    this._iosCheckbox = <BEMCheckBox>BEMCheckBox.alloc().initWithFrame(CGRectMake(0, 0, 25, 25));
    this._iosLabel =  UILabel.alloc().initWithFrame(CGRectMake(30,0, 300, 30));
    this._delegate = BEMCheckBoxDelegateImpl.initWithOwner(new WeakRef(this));
  }  

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

  get _nativeView(): any {
    return this._iosCheckbox;
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

  set onFillColor(color: string) {
    if (this._iosCheckbox)
      this._iosCheckbox.onFillColor = new Color(color).ios;
    else
      this._onFillColor = color;
  }

  set onTintColor(color: string) {
    if (this._iosCheckbox)
      this._iosCheckbox.onTintColor = new Color(color).ios;
    else
      this._onTintColor = color;
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
  
  public reload(value: boolean) {
    this._iosCheckbox.reload();
  }

  public onLoaded() {
    // Only here is where the view xml width/height is defined 
    this._iosCheckbox.frame.size.width = this.width;
    this._iosCheckbox.frame.size.height = this.height;
    
    this._iosLabel.text = this.text;
    this._iosCheckbox.addSubview(this._iosLabel);

    this._iosCheckbox.on = this.checked;

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
    if (typeof this._onFillColor !== 'undefined') {
      this.onFillColor = this._onFillColor;
    }
    if (typeof this._onTintColor !== 'undefined') {
      this.onTintColor = this._onTintColor;
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
}

function onCheckedPropertyChanged(data: PropertyChangeData) {
    console.log("Check Changed");
    
    if(this._ios){
      this._ios.on = data.newValue;
    }
}

// register the setNativeValue callbacks
(<PropertyMetadata>CheckBox.checkedProperty.metadata).onSetNativeValue = onCheckedPropertyChanged;


function onTextPropertyChanged(data: PropertyChangeData) {
  if(this._iosLabel)
    this._iosLabel.text = this.text;
}

// register the setNativeValue callbacks
(<PropertyMetadata>CheckBox.textProperty.metadata).onSetNativeValue = onTextPropertyChanged;


class BEMCheckBoxDelegateImpl extends NSObject implements BEMCheckBoxDelegate {
    public static ObjCProtocols = [BEMCheckBoxDelegate];

    private _owner: WeakRef<CheckBox>;

    public static initWithOwner(owner: WeakRef<CheckBox>): BEMCheckBoxDelegateImpl {
        let delegate = <BEMCheckBoxDelegateImpl>BEMCheckBoxDelegateImpl.new();
        delegate._owner = owner;

        return delegate;
    }

    public animationDidStopForCheckBox(checkBox: BEMCheckBox): void {
        debugger;
        console.log("animationDidStopForCheckBox");
    }

    public didTapCheckBox(checkBox: BEMCheckBox): void {
        debugger;
        console.log("didTapCheckBox");
    }
}