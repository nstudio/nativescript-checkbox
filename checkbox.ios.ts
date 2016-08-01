import {ContentView} from "ui/content-view";
import {Color} from "color";

declare var BEMCheckBox: any, CGRectMake: any, BEMBoxType: any, BEMAnimationType: any;

export class CheckBox extends ContentView {
  private _ios: any;
  private _checked: boolean;
  private _lineWidth: number;
  private _hideBox: boolean;
  private _boxType: number;
  private _tint: string;
  private _onCheckColor: string;
  private _onFillColor: string;
  private _onTintColor: string;
  private _animationDuration: number;
  private _onAnimationType: number;
  private _offAnimationType: number;

  constructor() {
    super();
    // just create with any width/height as XML view width/height is undefined at this point
    // we modify width/height later below in onLoaded
    this._ios = BEMCheckBox.alloc().initWithFrame(CGRectMake(0, 0, 50, 50));
  }  

  get _nativeView(): any {
    return this._ios;
  }

  get checked(): boolean {
    if (this._ios)
      return this._ios.on;
    else
      return false;
  }
  
  set checked(value: boolean) {
    if (this._ios)
      this._ios.on = value;
    else
      this._checked = value;
  }

  set checkedAnimated(value: boolean) {
    if (this._ios)
      this._ios.setOnAnimated(value, true);
  }

  set lineWidth(value: number) {
    if (this._ios)
      this._ios.lineWidth = value;
    else
      this._lineWidth = value;
  }

  set hideBox(value: boolean) {
    if (this._ios)
      this._ios.hideBox = value;
    else
      this._hideBox = value;
  }

  set boxType(value: number) {
    let type = BEMBoxType.BEMBoxTypeCircle;
    if (value === 2) {
      type = BEMBoxType.BEMBoxTypeSquare;
    }
    if (this._ios)
      this._ios.boxType = type;
    else
      this._boxType = value;
  }

  set tint(color: string) {
    if (this._ios)
      this._ios.tintColor = new Color(color).ios;
    else
      this._tint = color;
  }

  set onCheckColor(color: string) {
    if (this._ios)
      this._ios.onCheckColor = new Color(color).ios;
    else
      this._onCheckColor = color;
  }

  set onFillColor(color: string) {
    if (this._ios)
      this._ios.onFillColor = new Color(color).ios;
    else
      this._onFillColor = color;
  }

  set onTintColor(color: string) {
    if (this._ios)
      this._ios.onTintColor = new Color(color).ios;
    else
      this._onTintColor = color;
  }

  set animationDuration(value: number) {
    if (this._ios)
      this._ios.animationDuration = value;
    else
      this._animationDuration = value;
  }

  set onAnimationType(value: number) {
    if (this._ios)
      this._ios.onAnimationType = this.getAnimationType(value);
    else
      this._onAnimationType = value;
  }

  set offAnimationType(value: number) {
    if (this._ios)
      this._ios.offAnimationType = this.getAnimationType(value);
    else
      this._offAnimationType = value;
  }
  
  public reload(value: boolean) {
    this._ios.reload();
  }

  public onLoaded() {
    console.log(`onLoaded`);
    // Only here is where the view xml width/height is defined 
    console.log(this.width + ', ' + this.height);
    this._ios.frame.size.width = this.width;
    this._ios.frame.size.height = this.height;
    // console.log(this._ios);

    if (typeof this._checked !== 'undefined') {
      this.checked = this._checked;
    }
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

  private getAnimationType(value: number) {
    switch (value) {
      case 1:
        return BEMAnimationType.BEMAnimationTypeStroke;
      case 2:
        return BEMAnimationType.BEMAnimationTypeFill;
      case 3:
        return BEMAnimationType.BEMAnimationTypeBounce;
      case 4:
        return BEMAnimationType.BEMAnimationTypeFlat;
      case 5:
        return BEMAnimationType.BEMAnimationTypeOneStroke;
      case 6:
        return BEMAnimationType.BEMAnimationTypeFade;
    }
  }
}