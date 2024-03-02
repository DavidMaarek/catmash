import { Component, OnInit } from '@angular/core';
import { CatsService } from "../../services/cats/cats.service";
import { Cat, CatsList } from "../../interfaces/cats.interface";
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
  public catsList: CatsList = { images: [] };
  public drawCats: Cat[] = [];

  constructor(
    private catsService: CatsService,
    private votesService: VotesService,
  ) { }
  ngOnInit(): void {
    this.catsService.getCats().subscribe({
      next: (response: CatsList): void => {
        console.log(response);
        this.catsList = response;
        this.drawInit();
      },
      error: (error): void => {
        console.log(error);
      }
    });
  }

  private drawInit(): void {
    this.drawCats = [];
    while (this.drawCats.length < 2) {
      const randomCat: Cat = this.getRandomCat();
      const catIndex: number = this.drawCats.findIndex((cat: Cat): boolean => cat.id === randomCat.id);
      catIndex === -1 ? this.drawCats.push(randomCat) : null;
    }
  }

  public getRandomCat(): Cat {
    return this.catsList.images[Math.floor(Math.random() * this.catsList.images.length)];
  }

  public saveVote(catId: string): void {
    const votes = this.votesService.getVotes();
    console.log(votes);
    console.log(votes[catId]);
    votes[catId] = (votes[catId] || 0) + 1;
    localStorage.setItem('votes', JSON.stringify(votes));
    this.drawInit();
  }
}
