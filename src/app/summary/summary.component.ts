import { Component, Input, OnInit } from '@angular/core';
import { Airport, Flight, Journey, PassangersCount } from '../interfaces';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  @Input() flight: Flight | undefined | null;
  @Input() journey: Journey | undefined | null;
  @Input() departure: Airport | undefined | null;
  @Input() destination: Airport | undefined | null;
  @Input() passangersCount: PassangersCount | undefined | null;
  @Input() price: Flight | undefined | null;

  constructor() { }

  ngOnInit(): void {
  }

}
