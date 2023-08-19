import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Router } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { NavBarComponent } from './componentes/navBar/navBar.component';
import { BolsosComponent } from './componentes/bolsos/bolsos.component';
import { TennisComponent } from './componentes/tennis/tennis.component';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { LoadingSpinnerComponent } from './componentes/loading-spinner/loading-spinner.component';


import { AdminComponent } from './componentes/admin/admin.component';
import { LoadingSpinner2Component } from './componentes/loading-spinner2/loading-spinner2.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    BolsosComponent,
    TennisComponent,
    CarritoComponent,
    LoadingSpinnerComponent,
    AdminComponent,
    LoadingSpinner2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [Router],
  bootstrap: [AppComponent]
})
export class AppModule { }
