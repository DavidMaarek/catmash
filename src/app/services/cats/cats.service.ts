import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { CatsFromApi } from "../../interfaces/cats.interface";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class CatsService {

  constructor(
    private http: HttpClient,
  ) { }

  public getCats(): Observable<CatsFromApi> {
    return this.http.get<CatsFromApi>('https://data.latelier.co/cats.json');
  }
}
