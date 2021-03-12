import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrowdinComponent } from './crowdin/crowdin.component';
import { LandingComponent } from './landing/landing.component';
import { TopTenComponent } from './top-ten/top-ten.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: LandingComponent },
  { path: 'top-ten', component: TopTenComponent },
  { path: 'crowdin', component: CrowdinComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
