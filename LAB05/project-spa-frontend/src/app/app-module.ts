import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ProjectComponent } from './project/project.component';
//import HTTP client
import { HttpClientModule } from '@angular/common/http';
import { ProjectService } from './services/project.service';
// import formsmodule
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    App,
    ProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ProjectService
  ],
  bootstrap: [ProjectComponent]
})
export class AppModule { }
