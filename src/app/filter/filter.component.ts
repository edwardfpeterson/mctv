import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Violation } from '../violation';
import { FilterSettings } from '../filterSettings';
import { FormsModule} from "@angular/forms"
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  //object to contain all the settings needed by the filter
  settings= new FilterSettings();
  //violation object that acts as the template for the search function. This gets sent to the server as part of the filter settings.
  template: Violation = new Violation();
  //violations array used to display number of results shown
  @Input() violations: Violation[];
  constructor() { }
  //lets the parent component know when to tell the violationservice to fetch new stuff with the settings from this component.
  @Output() notifySearchUpdate = new EventEmitter<FilterSettings>();
  ngOnInit() {
  }
  //called when the "update results" button is pressed. Resets the page to the first page, and sends the filtersettings to the parent component.
  updateResults(){
    this.settings.page = 0;
    this.settings.template = this.template;
    this.notifySearchUpdate.emit(this.settings);
  }
  //resets all the input fields by setting the template to a new instance of violation.
  clearInputs(){
    this.template = new Violation();
  }
  //increments the current page number and sends the filter settings to the parent
  nextPage(){
    this.settings.page += 1;
    this.settings.template = this.template;
    this.notifySearchUpdate.emit(this.settings);
  }
  //decrements the page number and sends the filter settings to the parent. Won't go before page 1.
  previousPage(){
    if(this.settings.page == 0) return;
    this.settings.page -= 1;
    this.settings.template = this.template;
    this.notifySearchUpdate.emit(this.settings);
  }
}
