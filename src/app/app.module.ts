import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { DetailsMakerComponent } from './components/details-maker/details-maker.component';
import { CustomerProfileComponent } from './components/customer-profile/customer-profile.component';
import { MakerProfileComponent } from './components/maker-profile/maker-profile.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    DetailsMakerComponent,
    CustomerProfileComponent,
    MakerProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
