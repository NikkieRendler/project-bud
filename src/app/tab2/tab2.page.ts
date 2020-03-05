import { Component } from '@angular/core';
import { FeaturesService } from '../services/features.service';
import { ModalController } from '@ionic/angular';
import { AddFeatureComponent } from '../add-feature/add-feature.component';
import { ProjectsService } from '../services/projects.service';
import { EditFeatureComponent } from '../edit-feature/edit-feature.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    public projectsService: ProjectsService,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.projectsService.getFeatures();

  }

  async openAddModal() {
    const modal = await this.modalController.create({
      component: AddFeatureComponent
    });
    return await modal.present();
  }

  async openEditModal(featureName, devHours) {
    const modal = await this.modalController.create({
      component: EditFeatureComponent,
      componentProps: {
        featureName,
        devHours
      }
    });
    return await modal.present();
  }

  deletefeature(featureName) {
    this.projectsService.deleteFeature(featureName);
  }

}
