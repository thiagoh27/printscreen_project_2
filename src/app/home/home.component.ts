import { Component } from '@angular/core';
import { NgxCaptureService } from 'ngx-capture';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
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

