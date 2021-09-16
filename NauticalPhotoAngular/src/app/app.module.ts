import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* Custom Components */
import { LandingComponent } from './_Pages/landing/landing.component';
import { ExploreComponent } from './_Pages/explore/explore.component';

/* Added components */
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { HttpClientModule } from '@angular/common/http';

const myRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'explore', component: ExploreComponent },
];

@NgModule({
  declarations: [AppComponent, LandingComponent, ExploreComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(myRoutes, { useHash: true }),
    BrowserAnimationsModule,
    MatSliderModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
