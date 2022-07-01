import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Airport, Flight, Journey, PassangersCount } from '../interfaces';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss']
})
export class FlightDetailsComponent implements OnInit {
  @Input() flight: Flight | undefined | null;
  @Input() journey: Journey | undefined | null;
  @Input() departure: Airport | undefined | null;
  @Input() destination: Airport | undefined | null;
  @Input() passangersCount: PassangersCount | undefined | null;

  typesOfBaggage: 'carry-on' | 'checked' = 'carry-on';

  constructor(private apiService: ApiService,
    private router: Router) { }

  ngOnInit(): void {

  }

}
