import { Component, OnInit } from '@angular/core';
import { CatsService } from "../../services/cats/cats.service";
import { Cat, CatsFromApi } from "../../interfaces/cats.interface";
import { NgForOf } from "@angular/common";
import { HeaderComponent } from "../../components/header/header.component";
import { RouterLink } from "@angular/router";
import { VotesService } from "../../services/votes/votes.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf,
    HeaderComponent,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  public errorApi: boolean = false;
  public cats: Cat[] = [];
  public twoRandomCats: Cat[] = [];

  constructor(
    private catsService: CatsService,
    private votesService: VotesService,
  ) { }
  ngOnInit(): void {
    this.catsService.getCats().subscribe({
      next: (response: CatsFromApi): void => {
        this.cats = response.images;
        this.drawInit();
      },
      error: (error): void => {
        this.errorApi = true;
      }
    });
  }

  private drawInit(): void {
    this.twoRandomCats = [];
    if (this.cats.length > 2) {
      while (this.twoRandomCats.length < 2) {
        const randomCat: Cat = this.getRandomCat();
        const catIndex: number = this.twoRandomCats.findIndex((cat: Cat): boolean => cat.id === randomCat.id);
        if (catIndex === -1) this.twoRandomCats.push(randomCat);
      }
    } else {
      this.errorApi = true;
    }
  }

  public getRandomCat(): Cat {
    return this.cats[Math.floor(Math.random() * this.cats.length)];
  }

  public saveVote(catId: string): void {
    const votes: Record<string, number> = this.votesService.getVotes();
    votes[catId] = (votes[catId] || 0) + 1;
    this.votesService.setVotes(votes);
    this.drawInit();
  }
}
