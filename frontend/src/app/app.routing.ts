import {Routes, RouterModule} from "@angular/router";
import {AboutComponent} from "./about/about.component";
import {AlbumsComponent} from "./albums/albums.component";
import {RatingComponent} from "./rating/rating.component";
import {HomeComponent} from "./home/home.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {SearchComponent} from "./search/search.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'albums', component: AlbumsComponent},
  {path: 'rating', component: RatingComponent},
  {path: 'search', component: SearchComponent},
  {path: 'about', component: AboutComponent},
  {path: 'dashboard', component: DashboardComponent}
  // {path: '', redirectTo: '/', pathMatch: 'full'}
];

export const routing = RouterModule.forRoot(routes);
