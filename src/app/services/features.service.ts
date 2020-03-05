import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Project } from './projects.service';

export interface Feature {
  name: string;
  devHours: number;
}

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})

export class FeaturesService {
  private FEATURES_STORAGE: string = 'features';
  public featuresList: Feature[] = [];

  constructor() { }

  public async getFeatures() {
    const features = await Storage.get({ key: this.FEATURES_STORAGE });
    this.featuresList = JSON.parse(features.value);
  }

  createFeature(feature: Feature) {
    console.log(this.featuresList);
    
    this.featuresList.unshift(feature);
    Storage.set({
      key: this.FEATURES_STORAGE,
      value: JSON.stringify(this.featuresList)
    });
  }
}
