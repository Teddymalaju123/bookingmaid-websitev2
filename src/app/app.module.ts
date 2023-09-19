import { LOCALE_ID, NgModule } from '@angular/core';
// import localeEs from '@angular/common/locales/es';
import { BrowserModule } from '@angular/platform-browser';
import en from '@angular/common/locales/en';
import localEn from '@angular/common/locales/en';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/authentication/login/login.component';
import { ForgotPasswordComponent } from './modules/authentication/forgot-password/forgot-password.component';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AntDesignModule } from './common/ant-design.module';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';


registerLocaleData(localEn,'en');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserAnimationsModule,
    NoopAnimationsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    AntDesignModule,
    NzCarouselModule,
    NzAutocompleteModule
  ],
  providers: [
    // ... other providers
    { provide: NZ_I18N, useValue: en_US },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
