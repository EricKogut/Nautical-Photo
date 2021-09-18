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
import { PhotoUploaderComponent } from './_Common/photo-uploader/photo-uploader.component';
import { HeaderComponent } from './_Common/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './_Pages/login/login.component';
import { RegisterComponent } from './register/register.component';

const myRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'explore', component: ExploreComponent },
];

@NgModule({
  declarations: [AppComponent, LandingComponent, ExploreComponent, PhotoUploaderComponent, HeaderComponent, LoginComponent, RegisterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(myRoutes, { useHash: true }),
    BrowserAnimationsModule,
    MatSliderModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
