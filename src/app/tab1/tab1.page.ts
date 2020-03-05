import { Component } from '@angular/core';
import { ProjectsService } from '../services/projects.service';
import { ModalController } from '@ionic/angular';
import { AddProjectComponent } from '../add-project/add-project.component';
import { EditProjectComponent } from '../edit-project/edit-project.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    public projectsService: ProjectsService,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.projectsService.getProjects();
    console.log(this.projectsService.projectList);
  }

  async openAddModal() {
    const modal = await this.modalController.create({
      component: AddProjectComponent
    });
    return await modal.present();
  }

  async openEditModal(projectName) {
    const modal = await this.modalController.create({
      component: EditProjectComponent,
      componentProps: {
        projectName
      }
    });
    return await modal.present();
  }

  deleteProject(projectName) {
    this.projectsService.deleteProject(projectName);
  }
}
