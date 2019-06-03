import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AgmCoreModule, GoogleMapsAPIWrapper, MapsAPILoader} from "@agm/core";
import { MapDisplayComponent } from './map-display.component';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
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
});
