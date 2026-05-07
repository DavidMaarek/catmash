import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { CatsFromApi } from "../../interfaces/cats.interface";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class CatsService {

  private readonly CATS_DATA_URL = '/assets/cats.json';

  constructor(
    private http: HttpClient,
  ) { }

  public getCats(): Observable<CatsFromApi> {
    return this.http.get<CatsFromApi>(this.CATS_DATA_URL);
  }
}
