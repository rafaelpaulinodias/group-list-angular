import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@blox/material';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    MaterialModule
  ],
  exports: [LoginComponent]
})
export class SecurityModule { }
