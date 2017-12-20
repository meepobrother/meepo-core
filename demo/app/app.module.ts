import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MeepoCoreModule } from '../../src/app/app';
import { MeepoBmapModule } from 'meepo-bmap';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MeepoCoreModule,
    MeepoBmapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

