import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* Custom Components */
import { LandingComponent } from './_Pages/landing/landing.component';
import { ExploreComponent } from './_Pages/explore/explore.component';

/* Added components */
import { Routes, RouterModule } from '@angular/router';

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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
