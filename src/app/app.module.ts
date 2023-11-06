import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';
import { SiginComponent } from './modules/sigin/sigin.component';
import { InicioComponent } from './modules/inicio/inicio.component';
import { WelcomeComponent } from './modules/welcome/welcome.component';
import { RedactarComponent } from './modules/redactar/redactar.component';
import { BuscarResComponent } from './modules/buscar-res/buscar-res.component';
import { MisResComponent } from './modules/mis-res/mis-res.component';
import { MenubarModule } from 'primeng/menubar';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SiginComponent,
    InicioComponent,
    WelcomeComponent,
    RedactarComponent,
    BuscarResComponent,
    MisResComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    MenubarModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
