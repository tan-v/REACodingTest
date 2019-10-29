import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PropertyCardComponent } from './custom-components/property-card/property-card.component';
import { PropertyListComponent } from './property-list/property-list.component';

import { PropertyDetailsService } from './services/property-details.service';
import { PropertyButtonComponent } from './custom-components/property-button/property-button.component';

@NgModule({
  declarations: [
    AppComponent,
    PropertyCardComponent,
    PropertyListComponent,
    PropertyButtonComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    PropertyDetailsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
