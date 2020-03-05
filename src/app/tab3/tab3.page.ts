import { Component } from '@angular/core';
import { HourlyRateService } from '../services/hourly-rate.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public salary: number;
  public dailyWorkingHours: number;

  constructor(public service: HourlyRateService) { }

  ngOnInit() {
    this.service.getHourlyRate();
  }

  calculateHourlyRate() {
    console.log(this.salary, this.dailyWorkingHours);
    
    this.service.hourlyRate = this.salary / 22 / this.dailyWorkingHours;
    this.service.saveHourlyRate();
  }

}
