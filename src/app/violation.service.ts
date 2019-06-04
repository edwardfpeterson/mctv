import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http"
import {Violation} from "./violation";
import { Observable } from 'rxjs';
import { FilterSettings } from './filterSettings';
@Injectable({
  providedIn: 'root'
})
export class ViolationService {
  filter: FilterSettings = new FilterSettings();
  constructor(private http: HttpClient) { }

  getViolations(lowerRange: number, higherRange: number) : Observable<Violation[]> {
    return this.http.get<Violation[]>("/api/listViolations/" + lowerRange + "-" + higherRange);
  }
  searchViolations(): Observable<Violation[]>{
    let headers =  {headers: new  HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'})};
    return this.http.post<Violation[]>("/api/searchViolations",JSON.stringify(this.filter), headers);
  }
}
