import { Component, Input, OnInit } from '@angular/core';
import { Airport, Flight, Journey, PassangersCount, Ticket } from '../interfaces';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {
  @Input() ticket: Ticket | undefined | null;

}
