import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FeaturesService } from '../services/features.service';
import { ProjectsService } from '../services/projects.service';

@Component({
  selector: 'app-add-feature',
  templateUrl: './add-feature.component.html',
  styleUrls: ['./add-feature.component.scss'],
})
export class AddFeatureComponent implements OnInit {

  constructor(private modalController: ModalController, private projectsService: ProjectsService) { }

  devHours: number;
  featureName: string;

  ngOnInit() {
    this.projectsService.getFeatures();
  }

  async closeModal() {
    await this.modalController.dismiss();
  }
  createFeature() {
    this.projectsService.createFeature({
      name: this.featureName,
      devHours: this.devHours,
    });
    this.closeModal();
  }

}
