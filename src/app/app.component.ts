import { Component, OnInit} from '@angular/core';
import { Violation } from './violation';
import { ViolationService } from "./violation.service";
import { FilterSettings } from './filterSettings';
import {HttpErrorResponse} from "@angular/common/http";
import { ErrorHandlerService } from './error-handler.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Montgomery County Traffic Violations';
  //keep the selected violation consistent between components
  selectedViolation: Violation;
  //local cache of the violations from the last search function
  violations: Violation[];
  //connect to the ViolationService to create the cache
  constructor (private violationService: ViolationService, private errorHandler: ErrorHandlerService){}
  
  ngOnInit() {
    //fetch initial search
    this.updateSearchResults(new FilterSettings());
  }
  //update the other components when a violation is selected in one of the views
  receiveViolationSelection(violation){
    this.selectedViolation = violation;
  }
  //apply new filter settings and request new results from the server
  updateSearchResults(filterSettings){
    this.violationService.filter = filterSettings;
    this.getViolations();
  }
  //perform the request from the server
  getViolations(): void{
    this.violationService.searchViolations().subscribe(violations => this.updateViolations(violations),(err:HttpErrorResponse)=>{
      this.errorHandler.errorMessage = err.message;
    });
    
  }
  //cache the newly found violations
  updateViolations(violations: Violation[]){
    console.log("server found " + violations.length + " results.");
    this.errorHandler.errorMessage = ""; //clear the error message if we got a result
    this.violations = violations;
  }
}
