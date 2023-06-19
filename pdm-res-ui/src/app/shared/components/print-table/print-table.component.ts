import { Component, OnInit } from '@angular/core';
import { PrintService } from '../../services/print.service';
import { map } from 'rxjs';
import { jsPDF}  from 'jspdf';

@Component({
  selector: 'app-print-table',
  templateUrl: './print-table.component.html',
  styleUrls: ['./print-table.component.sass']
})
export class PrintTableComponent implements OnInit{
  summary$ = this.printService.summary$;
  summaryB$ = this.summary$.pipe(
    map(summary=>{
      const data = summary.data;
      let newData = [];
      data.forEach(row=>{
        const {patientId, requestJson, ...newRow} = row;
        newData.push({...newRow, action: JSON.parse(newRow.action)?.prescription});
      })
      console.log('newData', newData);
      return {
        ...summary,
        data: newData
      }
    })
  )
  columns = null;
  constructor(
    private readonly printService: PrintService
  ){}

  ngOnInit(): void {
  }

  startPrint(printHtml){
    const doc = new jsPDF();

    doc.html(printHtml,{
      callback: function(doc) {
        // Save the PDF
        doc.save('report-summary.pdf');
      },
      //margin: [10, 10, 10, 10],
      autoPaging: 'text',
      x: 0,
      y: 0,
      width: 190, //target width in the PDF document
      windowWidth: 900, //window width in CSS pixels
    })
    setTimeout(() => {
      window.close();
    }, 1000);
  }

}
