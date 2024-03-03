import { Component, OnInit } from '@angular/core';
import { Cat, CatWithVote, CatsFromApi } from "../../interfaces/cats.interface";
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
  public errorApi: boolean = false;
  public catsWithVotes: CatWithVote[] = [];
  public votes: Record<string, number> = {};

  // Variable pour la pagination
  public queryParamP: string | null = null;
  public catsPerPage: number = 9;
  public currentPage: number = 1;
  public totalPages: number = 0;
  public catsInCurrentPage: CatWithVote[] = [];


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
      next: (response: CatsFromApi): void => {
        this.catsWithVotes = response.images.map((cat: Cat) => ({
          id: cat.id,
          url: cat.url,
          vote: this.votes[cat.id] || 0
        })).sort((a, b) => b.vote - a.vote);

        this.totalPages = Math.ceil((this.catsWithVotes.length - 3) / this.catsPerPage);

        if (
          this.queryParamP &&
          !isNaN(Number(this.queryParamP)) &&
          Number(this.queryParamP) >= 1 &&
          Number(this.queryParamP) <= this.totalPages)
        {
          this.currentPage = Number(this.queryParamP);
        }

        this.updatePaging(this.currentPage);
      },
      error: (error): void => {
        this.errorApi = true;
      }
    })
  }

  public updatePaging(p: number): void {
    const startIndex: number = 3 + (p - 1) * this.catsPerPage;
    const endIndex: number = startIndex + this.catsPerPage;
    this.catsInCurrentPage = this.catsWithVotes.slice(startIndex, endIndex);
    this.updateQueryParam(p.toString());
    this.currentPage = p;
  }

  public updateQueryParam(p: string):void {
    const tree: UrlTree = this.router.createUrlTree([], { queryParams: { p: p } });
    this.location.replaceState(this.urlSerializer.serialize(tree));
  }
}
