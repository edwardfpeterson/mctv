import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from "@angular/forms";
import { FilterComponent } from './filter.component';
import { Violation } from '../violation';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterComponent ],
      imports:[
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should clear inputs when the Clear Inputs button is presed.", () => {
    component.template.Make = "Chevy";
    expect(component.template.Make).toBe("Chevy");
    component.clearInputs();
    expect(component.template.Make).toBe(undefined);
  })
  it("should request the app to fetch new results and reset the page number when the Update Results button is presed", () =>{
    let testViolation = new Violation();
    testViolation.Make = "Ford";
    component.template = testViolation;
    component.settings.page = 3;
    component.settings.resultCount = 867;
    component.notifySearchUpdate.subscribe((data) => {
      expect(component.settings).toBe(data);
    });
    component.updateResults();
    expect(component.settings.page).toBe(0);
  });
  it("should decrement the page number, but not below 0", () => {
    component.settings.page = 0;
    component.previousPage()
    expect(component.settings.page).toBe(0);
  })
  it("should increment page number", () => {
    component.settings.page = 0;
    component.nextPage();
    expect(component.settings.page).toBe(1);
  })
});
