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

  dropMessage1: string = 'Drop the first Excel file here';
  dropMessage2: string = 'Drop the second Excel file here';

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
          this.dropMessage1 = 'Excel file added successfully';
          this.dropError1 = ''; // Limpa a mensagem de erro
        } else if (tableNumber === 2) {
          this.excelData2 = data;
          this.dropMessage2 = 'Excel file added successfully';
          this.dropError2 = ''; // Limpa a mensagem de erro
        }
      })
      .catch((error) => {
        console.error(`Error reading Excel file ${tableNumber}:`, error);
        if (tableNumber === 1) {
          this.dropMessage1 = 'Error adding Excel file';
          this.dropError1 = 'Failed to read Excel file'; // Define a mensagem de erro
        } else if (tableNumber === 2) {
          this.dropMessage2 = 'Error adding Excel file';
          this.dropError2 = 'Failed to read Excel file'; // Define a mensagem de erro
        }
      });
  }

  compareTables(): void {
    // Implemente a lógica de comparação entre as tabelas aqui
    const table1Element: HTMLTableElement = this.excelTable1.nativeElement;
    const table2Element: HTMLTableElement = this.excelTable2.nativeElement;

    // Exemplo: Comparar a primeira célula de ambas as tabelas
    const table1Rows = table1Element.rows;
    const table2Rows = table2Element.rows;

    for (let i = 0; i < this.excelData2.length; i++) {
      const row = this.excelData2[i];
      console.log(`Row ${i + 1}:`, row);

      for (let j = 0; j < row.length; j++) {
        const cell = row[j];
        console.log(`  Cell ${j + 1}:`, cell);
      }
    }
/*
    if (table1Rows.length > 1 && table1Rows[1].cells.length > 0) {
      const cell1 = table1Rows[1].cells[0].innerText;
      // Continue com o processamento...
    } else {
      console.error('Não foi possível acessar as células da tabela 1');
    }

    if (table2Rows.length > 1 && table2Rows[1].cells.length > 0) {
      const cell2 = table2Rows[1].cells[0].innerText;
      // Continue com o processamento...
    } else {
      console.error('Não foi possível acessar as células da tabela 2');
    }
*/
    console.log(`Comparison Result:  'Equal' 'Not Equal'`);

    const pdfContent = 'Equal';

    // Nome do arquivo
    const filename = 'comparison_result';

    // Chame a função no serviço FileService para gerar o arquivo PDF
    this.fileService.generatePDF(pdfContent, filename);

    // Atualize as variáveis para exibir o link de download
    this.pdfGenerated = true;
    this.pdfDownloadLink = `data:application/pdf;base64,${btoa(pdfContent[0])}`;
  }
}
