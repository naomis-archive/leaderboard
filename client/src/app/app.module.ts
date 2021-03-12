import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { HttpClientModule } from '@angular/common/http';
import { GetDataService } from './get-data.service';
import { CrowdinComponent } from './crowdin/crowdin.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [AppComponent, LandingComponent, CrowdinComponent, NavComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [GetDataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
