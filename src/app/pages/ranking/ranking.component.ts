import { Component, OnInit } from '@angular/core';
import { Cat, CatRanking, CatsList } from "../../interfaces/cats.interface";
import { CatsService } from "../../services/cats/cats.service";
import { HeaderComponent } from "../../components/header/header.component";
import { VotesService } from "../../services/votes/votes.service";
import { Location, NgClass } from "@angular/common";
import { ActivatedRoute, Router, RouterLink, UrlSerializer, UrlTree } from "@angular/router";

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [
    HeaderComponent,
    NgClass,
    RouterLink
  ],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.scss'
})
export class RankingComponent implements OnInit {
  public catsRanking: CatRanking[] = [];
  public votes: Record<string, number> = {};
  public queryParamP: string | null = null;
  public catsPerPage: number = 9;
  public currentPage: number = 1;
  public totalPages: number = 0;
  public catsInCurrentPage: CatRanking[] = [];


  constructor(
    private catsService: CatsService,
    private votesServices: VotesService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private urlSerializer: UrlSerializer,
  ) {
    this.queryParamP = this.route.snapshot.queryParamMap.get('p');
  }

  ngOnInit(): void {
    this.votes = this.votesServices.getVotes();

    this.catsService.getCats().subscribe({
      next: (response: CatsList): void => {
        console.log(response)
        this.catsRanking = response.images.map((cat: Cat) => ({
          id: cat.id,
          url: cat.url,
          vote: this.votes[cat.id] || 0
        })).sort((a, b) => b.vote - a.vote);
        console.log(this.catsRanking)
        this.totalPages = Math.ceil((this.catsRanking.length - 3) / this.catsPerPage);
        if (
          this.queryParamP &&
          !isNaN(Number(this.queryParamP)) &&
          Number(this.queryParamP) >= 1 &&
          Number(this.queryParamP) <= this.totalPages) {
          this.currentPage = Number(this.queryParamP);
        }
        this.updatePaging(this.currentPage);
      },
      error: (error): void => {
        console.log(error);
      }
    })
  }

  public updatePaging(page: number): void {
    const startIndex: number = 3 + (page - 1) * this.catsPerPage;
    const endIndex: number = startIndex + this.catsPerPage;
    this.catsInCurrentPage = this.catsRanking.slice(startIndex, endIndex);
    this.updateQueryParam(page.toString());
    this.currentPage = page;
    console.log(startIndex, endIndex);
    console.log(this.catsRanking.slice(startIndex, endIndex));
  }

  public updateQueryParam(p: string):void {
    const tree: UrlTree = this.router.createUrlTree([], { queryParams: { p: p } });
    this.location.replaceState(this.urlSerializer.serialize(tree));
  }
}
