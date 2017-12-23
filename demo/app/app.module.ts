import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PostTaskComponent } from './post-task/post-task';

import { MeepoCoreModule, MeepoCoreServiceModule } from 'meepo-core';
import { MeepoBmapModule } from 'meepo-bmap';

@NgModule({
  declarations: [
    AppComponent,
    PostTaskComponent
  ],
  imports: [
    BrowserModule,
    MeepoCoreModule.forRoot(),
    MeepoBmapModule.forRoot(),
    MeepoCoreServiceModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

