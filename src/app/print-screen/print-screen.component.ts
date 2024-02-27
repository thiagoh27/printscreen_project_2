import { Component } from '@angular/core';
import { NgxCaptureService } from 'ngx-capture';

@Component({
  selector: 'app-print-screen',
  templateUrl: './print-screen.component.html',
  styleUrl: './print-screen.component.css'
})
export class PrintScreenComponent {
  capturedImageUrl: string = '';

  constructor(private captureService: NgxCaptureService) {}

  captureScreen() {
    this.captureService.getImage(document.body, true)
      .subscribe(img => {
        // A imagem foi capturada com sucesso
        console.log(img);
        this.capturedImageUrl = img;
      }, error => {
        // Ocorreu um erro ao capturar a imagem
        console.error(error);
      });
  }

}
