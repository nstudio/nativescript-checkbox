# NativeScript-CheckBox

[![npm](https://img.shields.io/npm/v/nativescript-checkbox.svg)](https://www.npmjs.com/package/nativescript-checkbox)
[![npm](https://img.shields.io/npm/dt/nativescript-checkbox.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-checkbox)

# NativeScript CheckBox :white_check_mark:
A NativeScript plugin for the native checkbox widget.
** Android only - there is no concept of a checkbox on iOS. I'm looking to find a cocoapod to bring this plugin to both platforms. **

#### Platform controls used: 
Android |
---------- |
[Android CheckBox](https://developer.android.com/reference/android/widget/CheckBox.html) |


## Sample Usage

                Sample             |
-------------------------------------|
![Sample Usage](./screens/checkbox.gif) |


## Installation
From your command prompt/terminal go to your app's root folder and execute:

`tns plugin add nativescript-checkbox`

## Usage

###
```XML
<Page 
  xmlns="http://schemas.nativescript.org/tns.xsd" 
  xmlns:CheckBox="nativescript-checkbox" loaded="pageLoaded">
  <ActionBar title="Native Checkbox" />
  <StackLayout>
    <CheckBox:CheckBox checked="{{ checkProp }}" text="{{ myCheckText }}" color="{{ myCheckColor }}" id="myCheckbox" />
    <CheckBox:CheckBox text="CheckBox Label" checked="false" />
  </StackLayout>
</Page>
```

### 
```TS
import { CheckBox } from 'nativescript-checkbox';
import { topmost } from 'ui/frame';

public toggleCheck() {
  let checkBox = topmost().getViewById('yourCheckBoxId');
  checkBox.toggle();
}

public getCheckProp() {
  let checkBox = topmost().getViewById('yourCheckBoxId');
  console.log('checked prop value = ' + checkBox.checked);
}

```

## Properties

- **checked** - boolean
- **text** - text to use with the checkbox

## API

- **toggle()** - Change the checked state of the view to the inverse of its current state.

## Styling

- **color** - set the checkbox color tint - Android 21+ only.