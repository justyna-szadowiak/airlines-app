import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightComponent } from './flight/flight.component';
import { FooterComponent } from './footer/footer.component';
import { LogInComponent } from './log-in/log-in.component';
import { MainComponent } from './main/main.component';
import { SearchFlightComponent } from './search-flight/search-flight.component';

const routes: Routes = [
  {path: '', children: [
    {path: '', redirectTo: 'main', pathMatch: 'full'},
    {path: 'main', component: MainComponent},
    {path: 'flight', component: FlightComponent},
    {path: 'search-flight', component: SearchFlightComponent}
  ]},
  {path: 'login', component: LogInComponent},
  {path: 'footer', component: FooterComponent},
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
