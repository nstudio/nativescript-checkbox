import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Item } from "./item";
import { ItemService } from "./item.service";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
    formGroup: FormGroup;
    checkTest: boolean;
    items: Item[];

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
    }

    public submit() {
        console.log('NgModel value:', this.checkTest);
        console.log('Reactive FormGroup value:', this.formGroup.get('testCheck').value);
    }
}
