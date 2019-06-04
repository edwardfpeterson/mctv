import { TestBed, inject, flushMicrotasks } from '@angular/core/testing';

import { ViolationService } from './violation.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { Violation } from "./violation";
import { OnInit } from '@angular/core';
import { doesNotThrow } from 'assert';
import { HttpClientModule } from '@angular/common/http';
export class MockHTTPService implements OnInit{
  ngOnInit(): void {
    this.tv1.SeqID = "seq1";
    this.tv2.SeqID = "seq2";
    this.tv3.SeqID = "seq3";
  }

  private tv1 = new Violation();
  private tv2 = new Violation();
  private tv3 = new Violation();


  public get(path): Observable<Violation[]> {
    return of([this.tv1, this.tv2, this.tv3]);
  }
  public post(path, body, headers): Observable<Violation[]> {
    return of([this.tv1, this.tv3]);
  }
}


describe('ViolationService', () => {
  let mockHTTPService: MockHTTPService = new MockHTTPService();
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      {provide: HttpClientTestingModule, useValue: MockHTTPService}
    ]
  }));

  it('should be created', () => {
    const service: ViolationService = TestBed.get(ViolationService);
    expect(service).toBeTruthy();
  });

  //I'm still learning how to write Unit tests with Jasmine and Karma, and I haven't been able to figure out why the tester says that the last two tests don't have expectations. They don't fail though.

  it("should make get requests to the server", inject([HttpClientTestingModule],(mockHTTPService, done) => {
    
    const service: ViolationService = TestBed.get(ViolationService);
    service.getViolations(1, 100).subscribe((response) => {
      flushMicrotasks();
      expect(response.length).toBe(3);

      done();
    });

    
  }))
  it("Should make post requests to the server", inject([HttpClientTestingModule], (mockHTTPService, done) =>{
    const service: ViolationService = TestBed.get(ViolationService);
    service.searchViolations().subscribe((response) => {
      expect(response.length).toBe(2);
      flushMicrotasks();
      done();
    });

  }));
});
