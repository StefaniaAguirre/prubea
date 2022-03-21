import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerProfileComponent, DialogElementsDialog } from './components/customer-profile/customer-profile.component';
import { MakerProfileComponent } from './components/maker-profile/maker-profile.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { LoginComponent } from './components/login/login.component';
import { HeaderProfileComponent } from './components/header-profile/header-profile.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { DetailsServiceComponent } from './components/maker-profile/details-service/details-service.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerProfileComponent,
    MakerProfileComponent,
    LoginComponent,
    HeaderProfileComponent,
    DetailsServiceComponent,
    DialogElementsDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatRadioModule,
    ReactiveFormsModule,
    RouterModule,
    MatAutocompleteModule,
    MatDialogModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTooltipModule,
    MatTabsModule
  ],
  exports: [
    MatFormFieldModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
