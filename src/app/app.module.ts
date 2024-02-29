

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { MainPageComponent } from './main-page/main-page.component';
import { DropZoneComponent } from './drop-zone/drop-zone.component';
import { PrintScreenComponent } from './print-screen/print-screen.component';
import { RelatorioComponent } from './relatorio/relatorio.component';

import { DadosCompartilhadosService } from './dados-compartilhados.service';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([{ path: '', component: MainPageComponent },
                          { path: 'relatorio', component: RelatorioComponent }
    ]),
  ],
  declarations: [AppComponent, TopBarComponent, DropZoneComponent, PrintScreenComponent, RelatorioComponent, MainPageComponent],
  bootstrap: [AppComponent],
  providers: [DadosCompartilhadosService] // Adicione o serviço aos provedores
})
export class AppModule {}
