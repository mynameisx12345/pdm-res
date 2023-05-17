import { Component, Input } from '@angular/core';
import { MyRequestsModel } from '../../model/patient.model';

@Component({
  selector: 'app-request-status',
  templateUrl: './request-status.component.html',
  styleUrls: ['./request-status.component.sass']
})
export class RequestStatusComponent {
  @Input() requestData: MyRequestsModel;
}
