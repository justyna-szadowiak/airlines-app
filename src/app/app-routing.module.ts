import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'footer', component: FooterComponent, children: [
    {path: 'baggage', redirectTo: 'support/baggage', },
    {path: 'FAQ', redirectTo: 'support/faq'},
    {path: 'rules&regulations', redirectTo: 'support/rules-and-regulation'},
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
