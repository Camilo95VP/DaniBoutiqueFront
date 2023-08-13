import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Router } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { NavBarComponent } from './componentes/navBar/navBar.component';
import { BolsosComponent } from './componentes/bolsos/bolsos.component';
import { TennisComponent } from './componentes/tennis/tennis.component';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { LoadingSpinnerComponent } from './componentes/loading-spinner/loading-spinner.component';

import { async } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    BolsosComponent,
    TennisComponent,
    CarritoComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [Router],
  bootstrap: [AppComponent]
})
export class AppModule { }
