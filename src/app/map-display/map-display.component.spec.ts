import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AgmCoreModule, GoogleMapsAPIWrapper, MapsAPILoader} from "@agm/core";
import { MapDisplayComponent } from './map-display.component';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Violation } from '../violation';
export class MockMapsAPILoader {
  public load(): Promise<boolean> {
    return new Promise(() => {
      return true;
    });
  }
}
describe('MapDisplayComponent', () => {
  let component: MapDisplayComponent;
  let fixture: ComponentFixture<MapDisplayComponent>;



  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapDisplayComponent ],
      providers:[GoogleMapsAPIWrapper, MockMapsAPILoader],
      imports: [
        AgmCoreModule,
        HttpClientModule,
        AgmCoreModule.forRoot({})
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    
    fixture = TestBed.createComponent(MapDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should change focus point when a violation is selected", () => {
    let testViolation = new Violation();
    testViolation.Latitude = "90";
    testViolation.Longitude = "91";
    component.selectViolation(testViolation);
    expect(component.lat).toBe(90);
    expect(component.long).toBe(91);

  });
  it("should change focus point when a new violation set is loaded", () => {
    let testViolation1 = new Violation();
    testViolation1.Latitude = "90";
    testViolation1.Longitude = "91";
    let testViolation2 = new Violation();
    testViolation2.Latitude = "92";
    testViolation2.Longitude = "93";
    let testViolationArray1 = [testViolation1, testViolation2];
    let testViolation3 = new Violation();
    testViolation3.Latitude = "94";
    testViolation3.Longitude = "95";
    let testViolation4 = new Violation();
    testViolation4.Latitude = "96";
    testViolation4.Longitude = "97";
    let testViolationArray2 = [testViolation3, testViolation4];

    component.violations =  testViolationArray1;
    expect(component.lat).toBe(90);
    expect(component.long).toBe(91);
    
    component.violations = testViolationArray2;
    expect(component.lat).toBe(94);
    expect(component.long).toBe(95);
  });
  it("should default the map position to the coordinates of Washington DC", () => {
    let lat = 38.9072;
    let long = -77.0369;
    expect(component.lat).toBe(lat);
    expect(component.long).toBe(long);
  })
});
