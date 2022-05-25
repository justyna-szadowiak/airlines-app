import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BaggageComponent } from './baggage/baggage.component';
import { BookFlightComponent } from './book-flight/book-flight.component';
import { FAQComponent } from './faq/faq.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { RulesAndRegulationsComponent } from './rules-and-regulations/rules-and-regulations.component';
import { SupportCenterComponent } from './support-center/support-center.component';

const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'menu', component: MenuComponent, children: [
    {path: 'book-flight', component: BookFlightComponent, redirectTo: 'menu/book-flight'},
    {path: 'support-center', component: SupportCenterComponent, redirectTo: 'menu/support-center'}
  ]},
  {path: 'footer', component: FooterComponent, children: [
    {path: 'baggage', component: BaggageComponent, redirectTo: 'support/baggage'},
    {path: 'FAQ', component: FAQComponent, redirectTo: 'support/faq'},
    {path: 'rulesAndRegulations', component: RulesAndRegulationsComponent, redirectTo: 'support/rules-and-regulation'},
    ]},
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
