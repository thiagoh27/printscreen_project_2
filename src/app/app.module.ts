

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { DropZoneComponent } from './drop-zone/drop-zone.component';
import { PrintScreenComponent } from './print-screen/print-screen.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([{ path: '', component: DropZoneComponent }]),
  ],
  declarations: [AppComponent, TopBarComponent, DropZoneComponent, PrintScreenComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
