import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { CatsList } from "../../interfaces/cats.interface";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class CatsService {

  constructor(
    private http: HttpClient,
  ) { }

  public getCats(): Observable<CatsList> {
    return this.http.get<CatsList>('https://data.latelier.co/cats.json');
  }
}
