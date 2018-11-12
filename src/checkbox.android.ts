/// <reference path="./node_modules/tns-platform-declarations/android.d.ts" />

import { Color } from 'tns-core-modules/color';
import { device } from 'tns-core-modules/platform';
import * as app from 'tns-core-modules/application';
import {
	View,
	Property,
	CssProperty,
	Style,
	booleanConverter,
	ViewBase
} from 'tns-core-modules/ui/core/view';
import { CheckBoxInterface } from '.';
import { BoxType } from './checkbox-common';

export class CheckBox extends View {
	public checked: boolean;
	public nativeView: android.support.v7.widget.AppCompatCheckBox;
	private _android: android.support.v7.widget.AppCompatCheckBox;
	private _boxType: string;
	private _checkStyle: string;
	private _checkPadding: string;
	private _checkPaddingLeft: string;
	private _checkPaddingTop: string;
	private _checkPaddingRight: string;
	private _checkPaddingBottom: string;

	constructor() {
		super();
	}

	get android() {
		return this._android;
	}

	set boxType(value: string) {
		this._boxType = value;
	}

	get boxType() {
		return this._boxType;
	}

	get checkStyle() {
		return this._checkStyle;
	}

	set checkStyle(style) {
		this._checkStyle = style;
	}

	set checkPadding(padding) {
		this._checkPadding = padding;
	}

	get checkPadding() {
		return this._checkPadding;
	}

	set checkPaddingLeft(padding) {
		this._checkPaddingLeft = padding;
	}

	get checkPaddingLeft() {
		return this._checkPaddingLeft;
	}

	set checkPaddingTop(padding) {
		this._checkPaddingTop = padding;
	}

	get checkPaddingTop() {
		return this._checkPaddingTop;
	}

	set checkPaddingRight(padding) {
		this._checkPaddingRight = padding;
	}

	get checkPaddingRight() {
		return this._checkPaddingRight;
	}

	set checkPaddingBottom(padding) {
		this._checkPaddingBottom = padding;
	}

	get checkPaddingBottom() {
		return this._checkPaddingBottom;
	}
	public [checkedProperty.getDefault](): boolean {
		return false;
	}
	public [checkedProperty.setNative](value: boolean) {
		this.nativeView.setChecked(Boolean(value));
	}
	public [textProperty.getDefault](): string {
		return '';
	}
	public [textProperty.setNative](value: string) {
		this.nativeView.setText(java.lang.String.valueOf(value));
	}

	get fillColor(): string {
		return (<any>this.style).fillColor;
	}
	set fillColor(color: string) {
		(this.style as any).fillColor = color;
		if (this._android && device.sdkVersion >= '21') {
			// setButtonTintList is method on `android.widgeth.CompondButton`
			// here: https://developer.android.com/reference/android/widget/CompoundButton.html#setButtonTintList(android.content.res.ColorStateList)
			(this._android as any).setButtonTintList(
				android.content.res.ColorStateList.valueOf(new Color(color).android)
			);
		}
	}

	// there is no difference between tint and fill on the android widget
	get tintColor(): string {
		return (this.style as any).fillColor;
	}

	set tintColor(color: string) {
		(this.style as any).fillColor = color;
	}

	public createNativeView() {
		this._android = new android.support.v7.widget[
			BoxType[this.boxType] === BoxType.circle
				? 'AppCompatRadioButton'
				: 'AppCompatCheckBox'
		](this._context, null);
		// assign to the nativeView member
		this.nativeView = this.android;

		if (this.checkPaddingLeft) {
			this._android.setPadding(
				parseInt(this.checkPaddingLeft),
				this._android.getPaddingTop(),
				this._android.getPaddingRight(),
				this._android.getPaddingBottom()
			);
		}

		if (this.checkPaddingTop) {
			this._android.setPadding(
				this._android.getPaddingLeft(),
				parseInt(this.checkPaddingTop),
				this._android.getPaddingRight(),
				this._android.getPaddingBottom()
			);
		}

		if (this.checkPaddingRight) {
			this._android.setPadding(
				this._android.getPaddingLeft(),
				this._android.getPaddingTop(),
				parseInt(this.checkPaddingRight),
				this._android.getPaddingBottom()
			);
		}

		if (this.checkPaddingBottom) {
			this._android.setPadding(
				this._android.getPaddingLeft(),
				this._android.getPaddingTop(),
				this._android.getPaddingRight(),
				parseInt(this.checkPaddingBottom)
			);
		}

		if (this.checkPadding) {
			const pads = this.checkPadding.toString().split(',');
			switch (pads.length) {
				case 1:
					this._android.setPadding(
						parseInt(pads[0]),
						parseInt(pads[0]),
						parseInt(pads[0]),
						parseInt(pads[0])
					);
					break;
				case 2:
					this._android.setPadding(
						parseInt(pads[0]),
						parseInt(pads[1]),
						parseInt(pads[0]),
						parseInt(pads[1])
					);
					break;
				case 3:
					this._android.setPadding(
						parseInt(pads[0]),
						parseInt(pads[1]),
						parseInt(pads[2]),
						parseInt(pads[1])
					);
					break;
				case 4:
					this._android.setPadding(
						parseInt(pads[0]),
						parseInt(pads[1]),
						parseInt(pads[2]),
						parseInt(pads[3])
					);
					break;
			}
		}

		if (this.style.color) {
			this._android.setTextColor(this.style.color.android);
		}

		if (!this.style.fontSize) {
			this.style.fontSize = 15;
		}

		this._android.setTextSize(this.style.fontSize);

		const typeface = this.style.fontInternal.getAndroidTypeface();
		if (typeface) {
			this._android.setTypeface(typeface);
		}

		if (this._checkStyle) {
			const drawable = app.android.context
				.getResources()
				.getIdentifier(
					this._checkStyle,
					'drawable',
					app.android.context.getPackageName()
				);
			this._android.setButtonDrawable(drawable);
		}

		if (this._android) {
			if (this.fillColor) {
				android.support.v4.widget.CompoundButtonCompat.setButtonTintList(
					this._android,
					android.content.res.ColorStateList.valueOf(
						new Color(this.fillColor).android
					)
				);
			}
		}

		return this._android;
	}

	public initNativeView() {
		const that = new WeakRef(this);
		this.nativeView.setOnCheckedChangeListener(
			new android.widget.CompoundButton.OnCheckedChangeListener({
				get owner(): CheckBox {
					return that.get();
				},

				onCheckedChanged: function(sender, isChecked) {
					if (this.owner) {
						checkedProperty.nativeValueChange(this.owner, isChecked);
					}
				}
			})
		);
	}

	public disposeNativeView() {
		this.nativeView.setOnCheckedChangeListener(null);
	}

	public toggle(): void {
		this.nativeView.toggle();
	}

	public _onCheckedPropertyChanged(checkbox: CheckBox, oldValue, newValue) {
		if (!this.nativeView) {
			return;
		}
		checkedProperty.nativeValueChange(this, newValue);
	}
	public _onTextPropertyChanged(checkbox: CheckBox, oldValue, newValue) {
		if (!this.nativeView) {
			return;
		}
		textProperty.nativeValueChange(this, newValue);
	}
}

function onCheckedPropertyChanged(checkbox: CheckBox, oldValue, newValue) {
	checkbox._onCheckedPropertyChanged(checkbox, oldValue, newValue);
}
function onTextPropertyChanged(checkbox: CheckBox, oldValue, newValue) {
	checkbox._onTextPropertyChanged(checkbox, oldValue, newValue);
}

export const checkedProperty = new Property<CheckBox, boolean>({
	name: 'checked',
	defaultValue: false,
	valueConverter: booleanConverter,
	valueChanged: onCheckedPropertyChanged
});

export const textProperty = new Property<CheckBox, string>({
	name: 'text',
	defaultValue: '',
	valueChanged: onTextPropertyChanged
});

export const fillColorProperty = new CssProperty<Style, string>({
	name: 'fillColor',
	cssName: 'fill-color',
	valueConverter: v => {
		return String(v);
	}
});

export const tintColorProperty = new CssProperty<Style, string>({
	name: 'tintColor',
	cssName: 'tint-color',
	defaultValue: '#0075ff',
	valueConverter: v => {
		return String(v);
	}
});

checkedProperty.register(CheckBox);
textProperty.register(CheckBox);
fillColorProperty.register(Style);
tintColorProperty.register(Style);
