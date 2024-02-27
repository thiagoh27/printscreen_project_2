// drop-zone.component.ts
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FileService } from '../file.service';

// file.service.ts
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-drop-zone',
  templateUrl: './drop-zone.component.html',
  styleUrls: ['./drop-zone.component.css'],
})
export class DropZoneComponent {
  @ViewChild('excelTable1') excelTable1!: ElementRef;
  @ViewChild('excelTable2') excelTable2!: ElementRef;

  excelData1: any[][] = [];
  excelData2: any[][] = [];

  // Adicione as propriedades pdfGenerated, pdfDownloadLink e pdfFilename
  pdfGenerated: boolean = false;
  pdfDownloadLink: string = '';
  pdfFilename: string = 'comparison_result';

  dropMessage1: string = 'Arraste o arquivo VSTS';
  dropMessage2: string = 'Arraste o arquivo PAM';

  constructor(private fileService: FileService) {}

  onDrop(event: any): void {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    this.readFile(file, 1);
  }

  onDropSecond(event: any): void {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    this.readFile(file, 2);
  }

  onDragOver(event: any): void {
    event.preventDefault();
  }

  // Adicione propriedades para mensagens de erro
  dropError1: string = '';
  dropError2: string = '';

  private readFile(file: File, tableNumber: number): void {
    this.fileService
      .readExcelFile(file)
      .then((data: any[]) => {
        console.log(`Excel Data ${tableNumber}:`, data);
        if (tableNumber === 1) {
          this.excelData1 = data;
          this.dropMessage1 = 'VSTS adicionado';
          this.dropError1 = ''; // Limpa a mensagem de erro
        } else if (tableNumber === 2) {
          this.excelData2 = data;
          this.dropMessage2 = 'PAM adicionado';
          this.dropError2 = ''; // Limpa a mensagem de erro
        }
      })
      .catch((error) => {
        console.error(`Erro ao ler arquivo ${tableNumber}:`, error);
        if (tableNumber === 1) {
          this.dropMessage1 = 'Erro ao adicionar arquivo .csv';
          this.dropError1 = 'Falha ao ler arquivo .csv'; // Define a mensagem de erro
        } else if (tableNumber === 2) {
          this.dropMessage2 = 'rro ao adicionar arquivo .csv';
          this.dropError2 = 'Falha ao ler arquivo .csv'; // Define a mensagem de erro
        }
      });
  }

  compareTables(): void {
    // Implemente a lógica de comparação entre as tabelas aqui
    const table1Element: HTMLTableElement = this.excelTable1.nativeElement;
    const table2Element: HTMLTableElement = this.excelTable2.nativeElement;
  
    // Limpar dados anteriores
    this.excelData1 = [];
    this.excelData2 = [];
  
    // Ler dados das tabelas
    for (let i = 0; i < table1Element.rows.length; i++) {
      const row = table1Element.rows[i];
      const rowData = [];
      for (let j = 0; j < row.cells.length; j++) {
        rowData.push(row.cells[j].innerText);
      }
      this.excelData1.push(rowData);
    }
  
    for (let i = 0; i < table2Element.rows.length; i++) {
      const row = table2Element.rows[i];
      const rowData = [];
      for (let j = 0; j < row.cells.length; j++) {
        rowData.push(row.cells[j].innerText);
      }
      this.excelData2.push(rowData);
    }
  
    // Agora os dados estão disponíveis para exibição no HTML
  
    // Você pode continuar com a lógica de comparação, se necessário
  
    // Não se esqueça de remover a lógica de comparação atual das tabelas
  
    // Após isso, você pode prosseguir com a lógica de geração de PDF se necessário
  
    // Atualize as variáveis para exibir o link de download
    this.pdfGenerated = true;
    this.pdfDownloadLink = `data:application/pdf;base64,${btoa('Comparison result')}`;
  }
  
}
