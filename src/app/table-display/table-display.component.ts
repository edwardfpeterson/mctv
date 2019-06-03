import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Violation} from "../violation";
import { ViolationService } from '../violation.service';
import { ErrorHandlerService } from '../error-handler.service';
@Component({
  selector: 'app-table-display',
  templateUrl: './table-display.component.html',
  styleUrls: ['./table-display.component.css']
})
export class TableDisplayComponent implements OnInit {
  //local cache of violations from database
  private _violations: Violation[];
  //local copy of selected violation
  private _violation: Violation;
  //emitter to send selection of violation to parent
  @Output() selectionSender = new EventEmitter<Violation>();
  constructor(private violationService: ViolationService, public errorHandler: ErrorHandlerService) { }
  ngOnInit() {
  }
  //called when a violation is clicked in the table.
  selectViolation(violation: Violation){
    this._violation = violation; // use _violation here because it won't trigger the auto scroll function. If they clicked on it, it's clearly already in view
    //this.selectionSender.emit(violation); //normally, I'd want to alert the parent, but there's nothing that the map can really do change to indicate the new data.

  }
  //standard getter and setter for the violation cache of this component.
  @Input() set violations(violations: Violation[]){
    this._violations = violations;
  }
  get violations(){
    return this._violations;
  }
  //this setter gets called from the parent component when a violation is selected by another component. This auto scrolls the table to the selected violation.
  //There is a chance that more than one violation entry shares the same seqID, and therefore more than one may be highlighted by this component. This just means that the incident had more than one charge.
  @Input() set selectedViolation(violation: Violation){
    this._violation = violation;
    if(violation == null) return;
    var elements = document.getElementsByClassName(violation["SeqID"]);
    //if none of the currently displayed violations have the matching sequenceid, don't scroll.
    if(elements.length > 0){
      elements[0].scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
    }
  }
  get selectedViolation(){
    return this._violation;
  }
}
