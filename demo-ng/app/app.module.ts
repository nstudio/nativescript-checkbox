import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NativeScriptModule } from '@nativescript/angular';
import { TNSCheckBoxModule } from '@nstudio/nativescript-checkbox/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { ItemDetailComponent } from './item/item-detail.component';
import { ItemService } from './item/item.service';
import { ItemsComponent } from './item/items.component';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
    TNSCheckBoxModule,
    ReactiveFormsModule
  ],
  declarations: [AppComponent, ItemsComponent, ItemDetailComponent],
  providers: [ItemService],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
