import { ElementRef } from '@angular/core';
import { BaseValueAccessor } from '@nativescript/angular/forms/value-accessors/base-value-accessor';
import { View } from '@nativescript/core/ui/core/view';
export declare type CheckableView = {
    checked: boolean;
} & View;
export declare class CheckedValueAccessor extends BaseValueAccessor<CheckableView> {
    constructor(elementRef: ElementRef);
    checkedChangeListener(event: any): void;
    onTouched: () => void;
    writeValue(value: any): void;
    registerOnTouched(fn: () => void): void;
}
export declare class TNSCheckBoxModule {
}
