import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})


export class HourlyRateService {
  private HOURLY_RATE_STORAGE: string = 'hourlyRateStorage';
  public hourlyRate: number = 0;

  constructor() { }

  saveHourlyRate() {
    Storage.set({
      key: this.HOURLY_RATE_STORAGE,
      value: this.hourlyRate.toString()
    })
  }

  async getHourlyRate() {
    const rate = await Storage.get({ key: this.HOURLY_RATE_STORAGE });
    this.hourlyRate = +JSON.parse(rate.value);
  }
}
