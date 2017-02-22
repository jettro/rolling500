import {Routes, RouterModule} from "@angular/router";
import {AboutComponent} from "./about/about.component";
import {AlbumsComponent} from "./albums/albums.component";

const routes: Routes = [
  {path: 'albums', component: AlbumsComponent},
  {path: 'about', component: AboutComponent},
  {path: '', redirectTo: '/albums', pathMatch: 'full'}
];

export const routing = RouterModule.forRoot(routes);
