import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerProfileComponent } from './components/customer-profile/customer-profile.component';
import { DetailsMakerComponent } from './components/details-maker/details-maker.component';
import { LoginComponent } from './components/login/login.component';
import { MakerProfileComponent } from './components/maker-profile/maker-profile.component';
import { RegistrationComponent } from './components/registration/registration.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login'},

  { path: 'registration', component:RegistrationComponent},

  { path: 'login', component:LoginComponent},

  { path: 'detailsMaker', component:DetailsMakerComponent},

  { path: 'makerProfile', component: MakerProfileComponent},

  { path: 'header', component: MakerProfileComponent},

  { path: 'customerProfile', component:CustomerProfileComponent},

  { path:'**', redirectTo: '/login'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
