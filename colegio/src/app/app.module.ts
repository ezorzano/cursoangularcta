import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AlumnoModule } from './alumnos/alumno.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'alumnos', pathMatch: 'full' },
      { path: '**', redirectTo: 'alumnos', pathMatch: 'full' }
    ]),
    AlumnoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
