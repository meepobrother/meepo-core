import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PostTaskComponent } from './post-task/post-task';
import { MeepoCoreModule, MeepoCoreServiceModule } from '../../src/app/app';

@NgModule({
  declarations: [
    AppComponent,
    PostTaskComponent
  ],
  imports: [
    BrowserModule,
    MeepoCoreModule.forRoot(),
    MeepoCoreServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

