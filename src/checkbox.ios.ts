import { Color } from 'tns-core-modules/color';
import { Button } from 'tns-core-modules/ui/button';
import {
  booleanConverter,
  CssProperty,
  Property,
  Style
} from 'tns-core-modules/ui/core/view';
import { BoxType } from './checkbox-common';
import { CheckBoxInterface } from './index';

const checkBoxBackgroundColorProperty = new CssProperty<Style, string>({
  name: 'checkBoxBackgroundColor',
  cssName: 'checkbox-background-color',
  valueConverter: v => {
    return String(v);
  }
});

const onCheckColorProperty = new CssProperty<Style, string>({
  name: 'onCheckColor',
  cssName: 'on-check-color',
  defaultValue: '#ffffff',
  valueConverter: v => {
    return String(v);
  }
});

const tintColorProperty = new CssProperty<Style, string>({
  name: 'tintColor',
  cssName: 'tint-color',
  //   defaultValue: "#0075ff",
  valueConverter: v => {
    return String(v);
  }
});

const onTintColorProperty = new CssProperty<Style, string>({
  name: 'onTintColor',
  cssName: 'on-tint-color',
  valueConverter: v => {
    return String(v);
  }
});

const fillColorProperty = new CssProperty<Style, string>({
  name: 'fillColor',
  cssName: 'fill-color',
  valueConverter: v => {
    return String(v);
  }
});

const checkedProperty = new Property<CheckBox, boolean>({
  name: 'checked',
  defaultValue: false,
  valueConverter: booleanConverter,
  valueChanged: onCheckedPropertyChanged
});

const boxTypeProperty = new Property<CheckBox, BEMBoxType>({
  name: 'boxType',
  valueConverter: v => {
    return BoxType[v] === BoxType.circle
      ? BEMBoxType.Circle
      : BEMBoxType.Square;
  }
});

export class CheckBox extends Button implements CheckBoxInterface {
  public checked: boolean;
  public boxType: number;
  public _onCheckColor: string;
  public _checkBoxBackgroundColor: any;
  public _onTintColor: string;
  public _tintColor: string;
  public _onFillColor: string;
  public _fillColor: string;
  private _iosCheckbox: BEMCheckBox;
  private _delegate: BEMCheckBoxDelegateImpl;
  private _lineWidth: number = 1;
  private _hideBox: boolean;
  private _boxType: number;
  private _tint: string;
  private _animationDuration: number;
  private _onAnimationType: number;
  private _offAnimationType: number;

  constructor() {
    super();
    // just create with any width/height as XML view width/height is undefined at this point
    // we modify width/height later below in onLoaded
    this._iosCheckbox = BEMCheckBox.alloc().initWithFrame(
      CGRectMake(0, 0, 80, 80)
    ) as BEMCheckBox;
  }

  set fillColor(color: string) {
    this._fillColor = color;
    this._iosCheckbox.onFillColor = new Color(color).ios;
  }

  set onFillColor(color: string) {
    this._onFillColor = color;
    this._iosCheckbox.onFillColor = new Color(color).ios;
  }

  set tintColor(color: string) {
    this._tintColor = color;
    this._iosCheckbox.tintColor = new Color(color).ios;
  }

  set onTintColor(color: string) {
    this._onTintColor = color;
    this._iosCheckbox.onTintColor = new Color(color).ios;
  }

  set checkBoxBackgroundColor(color: any) {
    this._checkBoxBackgroundColor = color;
    this._iosCheckbox.offFillColor = new Color(color).ios;
  }

  set onCheckColor(color: string) {
    this._onCheckColor = color;
    this._iosCheckbox.onCheckColor = new Color(color).ios;
  }

  public [boxTypeProperty.setNative](value: any) {
    if (this._iosCheckbox) {
      this._iosCheckbox.boxType = value;
    }
  }

  public [checkedProperty.getDefault](): boolean {
    return false;
  }

  public [checkedProperty.setNative](value: boolean) {
    this._iosCheckbox.setOnAnimated(value, true);
  }

  set checkedAnimated(value: boolean) {
    this._iosCheckbox.setOnAnimated(value, true);
  }

  set lineWidth(value: number) {
    this._iosCheckbox.lineWidth = value;
    this._lineWidth = value;
  }

  set hideBox(value: boolean) {
    this._iosCheckbox.hideBox = value;
    this._hideBox = value;
  }

  set animationDuration(value: number) {
    this._iosCheckbox.animationDuration = value;
    this._animationDuration = value;
  }

  set onAnimationType(value: number) {
    if (this._iosCheckbox)
      this._iosCheckbox.onAnimationType = this._getAnimationType(value);
    else this._onAnimationType = value;
  }

  set offAnimationType(value: number) {
    this._iosCheckbox.offAnimationType = this._getAnimationType(value);
    this._offAnimationType = value;
  }

  get nativeiOSCheckBox() {
    return this._iosCheckbox;
  }

  public reload(value: boolean) {
    this._iosCheckbox.reload();
  }

  public initNativeView() {
    // allow label click to change the textbox
    this.addEventListener('tap', args => {
      const checkbox = args.object as CheckBox;
      checkbox.checked = !checkbox.checked;
    });

    this._onAnimationType = 2;
    this._offAnimationType = 2;

    this._delegate = BEMCheckBoxDelegateImpl.initWithOwner(new WeakRef(this));
    let fontSize;

    if (!this.style.fontSize) {
      fontSize = 15;
    } else {
      fontSize = this.style.fontSize;
    }

    this._iosCheckbox.delegate = this._delegate;
    // positioning
    this._iosCheckbox.frame = CGRectMake(0, 0, fontSize, fontSize);
    this._iosCheckbox.center = CGPointMake(
      this._iosCheckbox.center.x,
      fontSize / 2 + 3
    );
    this.style.paddingLeft = fontSize + (fontSize > 20 ? 10 : 5);
    this.style.textAlignment = 'left';

    if (this._onCheckColor) {
      this._iosCheckbox.onCheckColor = new Color(this._onCheckColor).ios;
    }

    if (this._onFillColor) {
      this._iosCheckbox.onFillColor = new Color(this._onFillColor).ios;
    }

    if (this._onTintColor) {
      this._iosCheckbox.onTintColor = new Color(this._onTintColor).ios;
    }

    if (this._fillColor) {
      this._iosCheckbox.onFillColor = new Color(this._fillColor).ios;
    }

    if (this._tintColor) {
      this._iosCheckbox.tintColor = new Color(this._tintColor).ios;
    }

    this.nativeView.addSubview(this._iosCheckbox);

    if (typeof this._lineWidth !== 'undefined') {
      this.lineWidth = this._lineWidth;
    }
    if (typeof this._hideBox !== 'undefined') {
      this.hideBox = this._hideBox;
    }

    this.boxType = this.boxType === 0 ? BEMBoxType.Circle : BEMBoxType.Square;

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

  public disposeNativeView() {
    this._iosCheckbox.delegate = null;
    this.removeEventListener('tap');
  }

  public toggle() {
    this.checked = !this.checked;
  }

  private _getAnimationType(value: number) {
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
      default:
        return BEMAnimationType.Stroke;
    }
  }

  public _onCheckedPropertyChanged(checkbox: CheckBox, oldValue, newValue) {
    if (!this.nativeView) {
      return;
    }
    checkedProperty.nativeValueChange(this, newValue);
  }
}

class BEMCheckBoxDelegateImpl extends NSObject implements BEMCheckBoxDelegate {
  public static ObjCProtocols = [BEMCheckBoxDelegate];
  /*public static ObjCExposedMethods = {
     "didTapCheckBox": { returns: interop.types.void, params: [NSObject] }
     };*/

  private _owner: WeakRef<CheckBox>;

  public static initWithOwner(
    owner: WeakRef<CheckBox>
  ): BEMCheckBoxDelegateImpl {
    const delegate = <BEMCheckBoxDelegateImpl>BEMCheckBoxDelegateImpl.new();
    delegate._owner = owner;
    return delegate;
  }

  public animationDidStopForCheckBox(checkBox: BEMCheckBox): void {
    // TODO: Maybe trigger event later?
  }

  public didTapCheckBox(checkBox: BEMCheckBox): void {
    const owner = this._owner.get();
    if (owner) {
      checkedProperty.nativeValueChange(owner, checkBox.on);
    }
  }
}

function onCheckedPropertyChanged(checkbox: CheckBox, oldValue, newValue) {
  checkbox._onCheckedPropertyChanged(checkbox, oldValue, newValue);
}

boxTypeProperty.register(CheckBox);
checkedProperty.register(CheckBox);
fillColorProperty.register(Style);
onTintColorProperty.register(Style);
onCheckColorProperty.register(Style);
checkBoxBackgroundColorProperty.register(Style);
tintColorProperty.register(Style);
