import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { BolsosComponent } from './componentes/bolsos/bolsos.component';
import { TennisComponent } from './componentes/tennis/tennis.component';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { AdminComponent } from './componentes/admin/admin.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'bolsos',component: BolsosComponent },
  { path: 'tennis', component: TennisComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'admin', component: AdminComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  
  exports: [RouterModule]
})
export class AppRoutingModule { }
