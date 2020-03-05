import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProjectsService } from '../services/projects.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
})
export class AddProjectComponent implements OnInit {

  constructor(private modalController: ModalController, public projectsService: ProjectsService) { }

  projectName: string;

  ngOnInit() {
    console.log(this.projectsService.projectList);
    
   }

  async closeModal() {
    await this.modalController.dismiss();
  }
  createProject() {
    this.projectsService.createProject({
      name: this.projectName,
      features: []
    });
    this.closeModal();
  }

}
