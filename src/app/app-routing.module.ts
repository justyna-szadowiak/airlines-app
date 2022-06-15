import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookFlightComponent } from './book-flight/book-flight.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { SupportCenterComponent } from './support-center/support-center.component';

const routes: Routes = [
  {path: '', children: [
    {path: '', redirectTo: 'main-page', pathMatch: 'full'},
    {path: 'main-page', component: MainComponent},
    {path: 'book-flight', component: BookFlightComponent}
  ]},
  {path: 'menu', children: [
    {path: 'book-flight', component: BookFlightComponent, redirectTo: 'menu/book-flight'},
    {path: 'support-center', component: SupportCenterComponent, redirectTo: 'menu/support-center'}
  ]},
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
