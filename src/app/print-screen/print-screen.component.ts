import { Component } from '@angular/core';
import { NgxCaptureService } from 'ngx-capture';
import { DadosCompartilhadosService } from '../dados-compartilhados.service'; 
import { Router } from '@angular/router'; 


@Component({
  selector: 'app-print-screen',
  templateUrl: './print-screen.component.html',
  styleUrl: './print-screen.component.css'
})
export class PrintScreenComponent {
  capturedImageUrl: string = '';

  constructor(
    private captureService: NgxCaptureService,
    private dadosCompartilhadosService: DadosCompartilhadosService,
    private router: Router
    ) {}

  captureScreen() {
    this.captureService.getImage(document.body, true)
      .subscribe(img => {
        // A imagem foi capturada com sucesso
        console.log(img);
        this.dadosCompartilhadosService.capturedImageUrl = img;
        this.router.navigate(['/relatorio']);
      }, error => {
        // Ocorreu um erro ao capturar a imagem
        console.error(error);
      });
  }

}
