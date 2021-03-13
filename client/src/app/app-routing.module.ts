import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrowdinComponent } from './crowdin/crowdin.component';
import { ForumComponent } from './forum/forum.component';
import { GithubComponent } from './github/github.component';
import { LandingComponent } from './landing/landing.component';
import { TopTenComponent } from './top-ten/top-ten.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: LandingComponent },
  { path: 'top-ten', component: TopTenComponent },
  { path: 'crowdin', component: CrowdinComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'github', component: GithubComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
