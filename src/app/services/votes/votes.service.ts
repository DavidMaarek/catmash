import { Injectable } from '@angular/core';
import { CatWithVote } from "../../interfaces/cats.interface";

@Injectable({
  providedIn: 'root'
})
export class VotesService {

  constructor() { }

  public setVotes(votes: Record<string, number>): void {
    localStorage.setItem('votes', JSON.stringify(votes));
  }

  public getVotes(): Record<string, number> {
    const votesString: string | null = localStorage.getItem('votes');
    return votesString ? JSON.parse(votesString) : {};
  }
}
