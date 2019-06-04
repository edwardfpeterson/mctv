import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDisplayComponent } from './table-display.component';
import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { Violation } from '../violation';
import { By } from '@angular/platform-browser';

describe('TableDisplayComponent', () => {
  let component: TableDisplayComponent;
  let fixture: ComponentFixture<TableDisplayComponent>;
  let de: DebugElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableDisplayComponent ],
      imports: [
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDisplayComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("should highlight a violation when clicked on", () => {
    let testViolation = new Violation();
    testViolation.SeqID = "SAMPLEID"
    component.violations = [testViolation];
    component.selectViolation(testViolation);
    fixture.detectChanges();
    let row = de.queryAll(By.css("tr"))[1];
    expect(row.classes["selectedRow"]).toBeTruthy();
  })
  it("should create a new row in the table for each entry", () => {
    let testViolation = new Violation();
    let testViolation2 = new Violation();
    component.violations = [testViolation, testViolation2];
    fixture.detectChanges();
    let rows =de.queryAll(By.css("tr"))
    expect(rows.length).toBe(3);
  });
});
