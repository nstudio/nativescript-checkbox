import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Item } from "./item";
import { ItemService } from "./item.service";
import { RadioOption } from "./radio-option";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
    formGroup: FormGroup;
    checkTest: boolean;
    items: Item[];
    radioOptions?: Array<RadioOption>;

    constructor(
        private formBuilder: FormBuilder,
        private itemService: ItemService
    ) { }

    ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            testCheck: [
                {
                    value: true,
                    disabled: false,
                },
                [
                    Validators.required
                ],
            ]
        });

        this.items = this.itemService.getItems();

        // Plain ol' inline Array definition coming up :)
        this.radioOptions = [
            new RadioOption("Radio option 1"),
            new RadioOption("Radio option 2"),
            new RadioOption("Radio option 3")
        ];
    }

    public submit() {
        console.log('NgModel value:', this.checkTest);
        console.log('Reactive FormGroup value:', this.formGroup.get('testCheck').value);
    }

    changeCheckedRadio(radioOption: RadioOption): void {
        radioOption.selected = !radioOption.selected;

        if (!radioOption.selected) {
            return;
        }

        // uncheck all other options
        this.radioOptions.forEach(option => {
            if (option.text !== radioOption.text) {
                option.selected = false;
            }
        });
    }
}
