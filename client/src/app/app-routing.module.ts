import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrowdinComponent } from './crowdin/crowdin.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: LandingComponent },
  { path: 'crowdin', component: CrowdinComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
