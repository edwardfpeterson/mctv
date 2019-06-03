import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Violation } from "../violation";
import { ViolationService } from '../violation.service';
@Component({
  selector: 'app-map-display',
  templateUrl: './map-display.component.html',
  styleUrls: ['./map-display.component.css']
})
export class MapDisplayComponent implements OnInit {
  //coordinates used to focus the map
  lat: number = 38.9072;
  long: number = -77.0369;
  //local access to violations from database
  private _violations: Violation[];
  //selected violation
  private _violation: Violation;
  //emitter to let the parent know when you clicked on one of the markers.
  @Output() selectionSender = new EventEmitter<Violation>();
  constructor(private violationService: ViolationService) { }

  ngOnInit() {
  }
  //called when the local cache of violations is updated. sets the map focus to the coordinates of the first result.
  @Input() set violations(violations: Violation[]){
    this._violations = violations;
    if(!this._violations || this._violations.length == 0){
      return;
    }
    this.lat = parseFloat(this.violations[0].Latitude);
    this.long = parseFloat(this.violations[0].Longitude);
  }
  get violations(){
    return this._violations;
  }
  //called when a marker is clicked. Triggers the emitter.
  selectViolation(violation: Violation) {
    this.selectedViolation = violation;
    this.selectionSender.emit(violation);
  }
  //triggered when the selected violation changes. Also updates map focus to the clicked marker
  @Input() set selectedViolation(violation: Violation){
    this._violation = violation;
    if(!violation) return;
    this.lat = parseFloat(violation.Latitude);
    this.long = parseFloat(violation.Longitude);
  }
  get selectedViolation(){
    return this._violation;
  }
}
