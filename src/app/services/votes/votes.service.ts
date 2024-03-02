import { Injectable } from '@angular/core';
import { CatRanking } from "../../interfaces/cats.interface";

@Injectable({
  providedIn: 'root'
})
export class VotesService {

  constructor() { }

  public getVotes(): Record<string, number> {
    const votesString: string | null = localStorage.getItem('votes');
    return votesString ? JSON.parse(votesString) : {};
  }
}
