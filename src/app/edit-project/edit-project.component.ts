import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProjectsService, Project } from '../services/projects.service';
import { HourlyRateService } from '../services/hourly-rate.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss'],
})
export class EditProjectComponent implements OnInit {
  @Input() projectName: string;
  selectedFeaturesNames: string[] = [];
  project: Project;
  totalHours: number = 0;
  totalCost: number = 0;

  constructor(
    private modalController: ModalController,
    public projectsService: ProjectsService,
    public hourlyRateService: HourlyRateService
  ) { }

  ngOnInit() {
    this.projectsService.getFeatures();
    this.hourlyRateService.getHourlyRate();
    this.project = this.projectsService.projectList.find(project => project.name === this.projectName);
    this.calculateProjectTotalCost();
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

  addFeature(event) {
    this.selectedFeaturesNames = event.detail.value;
    this.projectsService.addFeaturesToProjects([this.projectName], this.selectedFeaturesNames);
    this.calculateProjectTotalCost();
  }

  deleteProject(projectName) {
    this.projectsService.deleteProject(projectName);
  }

  removeFeatureFromProject(featureName) {
    this.projectsService.removeProjectFeature(this.projectName, featureName);
    this.calculateProjectTotalCost();
  }

  async calculateProjectTotalCost() {
    this.totalHours = 0;
    this.totalCost = 0;
    await this.project.features.map(feature => {
      this.totalHours += +feature.devHours;
    })
    this.totalCost = this.hourlyRateService.hourlyRate * this.totalHours;
  }

}
