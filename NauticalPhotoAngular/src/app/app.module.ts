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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

import { PhotoUploaderComponent } from './_Common/photo-uploader/photo-uploader.component';
import { HeaderComponent } from './_Common/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './_Common/auth/login/login.component';
import { RegisterComponent } from './_Common/auth/register/register.component';
import { AuthpageComponent } from './_Pages/authpage/authpage.component';
import { AuthInterceptor } from './_Services/auth.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProtectedComponent } from './_Common/auth/protected/protected.component';

const myRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'explore', component: ExploreComponent },
  { path: 'auth', component: AuthpageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    ExploreComponent,
    PhotoUploaderComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    AuthpageComponent,
    ProtectedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(myRoutes, { useHash: true }),
    BrowserAnimationsModule,
    NgbModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatToolbarModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
