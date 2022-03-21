import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerProfileComponent } from './components/customer-profile/customer-profile.component';
import { LoginComponent } from './components/login/login.component';
import { MakerProfileComponent } from './components/maker-profile/maker-profile.component';
import { HeaderProfileComponent } from './components/header-profile/header-profile.component';
import { DetailsServiceComponent } from './components/maker-profile/details-service/details-service.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login'},

  { path: 'login', component:LoginComponent},

  { path: 'detailsService', component:DetailsServiceComponent},

  { path: 'makerProfile', component: MakerProfileComponent},

  { path: 'header', component: HeaderProfileComponent},

  { path: 'customerProfile', component:CustomerProfileComponent},

  { path:'**', redirectTo: '/login'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
