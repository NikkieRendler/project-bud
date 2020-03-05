import { Component, OnInit, Input } from '@angular/core';
import { FeaturesService } from '../services/features.service';
import { ModalController } from '@ionic/angular';
import { Project, ProjectsService } from '../services/projects.service';

@Component({
  selector: 'app-edit-feature',
  templateUrl: './edit-feature.component.html',
  styleUrls: ['./edit-feature.component.scss'],
})
export class EditFeatureComponent implements OnInit {

  @Input() featureName: string;
  @Input() devHours: number;
  selectedProjectsNames: string[] = [];

  constructor(
    private featuresService: FeaturesService,
    public projectsService: ProjectsService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.projectsService.getProjects();
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

  handleSelection(event) {
    this.selectedProjectsNames = event.detail.value;
  }

  async editFeature() {
    this.projectsService.addFeaturesToProjects(this.selectedProjectsNames, [this.featureName]);
    this.closeModal();
  }

}
