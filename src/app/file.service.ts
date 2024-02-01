// src/app/file.service.ts
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf'; // Importe como um módulo padrão
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  readExcelFile(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        try {
          const data = new Uint8Array(event.target.result);
          const workbook = XLSX.read(data, { type: 'array' });

          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

          resolve(jsonData);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsArrayBuffer(file);
    });
  }

  generatePDF(content: string, filename: string): void {
    const doc = new jsPDF();
    doc.text(content, 10, 10);
    doc.save(`${filename}.pdf`);
  }
}
