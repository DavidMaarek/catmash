import { Routes } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import { RankingComponent } from "./pages/ranking/ranking.component";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'ranking',
    component: RankingComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
