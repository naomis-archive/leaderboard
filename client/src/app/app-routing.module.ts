import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContributorComponent } from './contributor/contributor.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { TopTenComponent } from './top-ten/top-ten.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: LandingComponent },
  { path: 'leaderboard', component: TopTenComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'contributor', component: ContributorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
