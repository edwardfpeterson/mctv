import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AgmCoreModule} from "@agm/core";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapDisplayComponent } from './map-display/map-display.component';
import { TableDisplayComponent } from './table-display/table-display.component';
import { HttpClientModule} from "@angular/common/http";
import { FilterComponent } from './filter/filter.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    MapDisplayComponent,
    TableDisplayComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    AgmCoreModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAwZ8BOoH62UGY1o9SPlQcP4GVt6xOlwsQ"
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
   CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
