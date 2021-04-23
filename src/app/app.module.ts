import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import "hammerjs";

import { MaterialModule } from '@blox/material'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';

import { CurrencyMaskInputMode, NgxCurrencyModule } from "ngx-currency";
import { HomeComponent } from './home/home.component';
import { SecurityModule } from './security/security.module';
import { AuthInterceptor } from './security/auth.interceptor';
import { NavbarComponent } from './navbar/navbar.component';
import { LoadOverlayComponent } from './components/load-overlay/load-overlay.component';


export const customCurrencyMaskConfig = {
  align: "right",
  allowNegative: false,
  allowZero: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: ".",
  nullable: true,
  min: null,
  max: null,
  inputMode: CurrencyMaskInputMode.FINANCIAL
};

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    HomeComponent,
    NavbarComponent,
    LoadOverlayComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    AppRoutingModule,
    SecurityModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
