import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Flight, City, Filter, FormFilter } from '../interfaces';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.scss']
})
export class BookFlightComponent implements OnInit {
    public flights$: Observable<Flight[]> | undefined;
    public cities$: Observable<City[]> | undefined;
    public showList:boolean = false;
    public filter: Filter | undefined;

  public bookFlightForm = new FormGroup({
    departureCity: new FormControl(),
    destionationCity: new FormControl(),
    startDate: new FormControl(),
    backDate: new FormControl(),
    adultsPassagers: new FormControl(1),
    childrenPassagers: new FormControl(0),
  })

  constructor(private apiService: ApiService,
    private router: Router) { }

  ngOnInit(): void {
    this.flights$ = this.apiService.getAllFligths()
    this.cities$ = this.apiService.getCities()
  }

  async submit() {
    this.showList = true;

    const formValues: FormFilter = this.bookFlightForm.getRawValue();
    const {departureCity, destionationCity, startDate, backDate} = formValues;
    this.filter = {departureCity, destionationCity, startDate, backDate}

  }
}
