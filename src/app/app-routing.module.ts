import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightComponent } from './flight/flight.component';
import { LogInComponent } from './log-in/log-in.component';
import { MainComponent } from './main/main.component';
import { SearchFlightComponent } from './search-flight/search-flight.component';

const routes: Routes = [
  {path: '', redirectTo: 'app', pathMatch: 'full'},
    {path: 'app', component: MainComponent, children: [
      {path: '', redirectTo: 'search', pathMatch: 'full'},
      {path: 'search', component: SearchFlightComponent},
      {path: 'flight', component: FlightComponent}
    ]},
  {path: 'login', component: LogInComponent},
  {
    path: '**',
    redirectTo: '/404',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
