// relatorio.component.ts
import { Component } from '@angular/core';
import { DadosCompartilhadosService } from '../dados-compartilhados.service'; 

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent {
  constructor(public dadosCompartilhadosService: DadosCompartilhadosService) {} 
}
