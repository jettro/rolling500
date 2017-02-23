import {Routes, RouterModule} from "@angular/router";
import {AboutComponent} from "./about/about.component";
import {AlbumsComponent} from "./albums/albums.component";
import {RatingComponent} from "./rating/rating.component";

const routes: Routes = [
  {path: 'albums', component: AlbumsComponent},
  {path: 'rating', component: RatingComponent},
  {path: 'about', component: AboutComponent},
  {path: '', redirectTo: '/albums', pathMatch: 'full'}
];

export const routing = RouterModule.forRoot(routes);
