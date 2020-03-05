import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Feature } from './features.service';

export interface Project {
  name: string;
  features?: Feature[];
}

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})

export class ProjectsService {
  private PROJECTS_STORAGE: string = 'projects';
  projectList: Project[] = [];

  private FEATURES_STORAGE: string = 'features';
  public featuresList: Feature[] = [];

  constructor() { }

  public async getProjects() {
    this.projectList === null ? this.projectList = [] : null;
    const projects = await Storage.get({ key: this.PROJECTS_STORAGE });
    this.projectList = JSON.parse(projects.value);
  }

  createProject(project: Project) {
    this.projectList === null ? this.projectList = [] : null;
    this.projectList.unshift(project);
    this.saveProjectsToStorage();
  }

  saveProjectsToStorage() {
    Storage.set({
      key: this.PROJECTS_STORAGE,
      value: JSON.stringify(this.projectList)
    });
  }

  addFeaturesToProjects(projectsNames: string[], featuresNames: string[]) {
    let featuresToAdd: Feature[] = [];

    featuresNames.map(featureName => {
      let featureIteration = this.featuresList.find(f => f.name === featureName);
      featuresToAdd.push(featureIteration);
    });

    projectsNames.map(projectNameToFind => {
      const projectIteration = this.projectList.find(p => p.name === projectNameToFind);
      featuresToAdd.map(featureToAdd => {
        if (!projectIteration.features.includes(featureToAdd)) {
          projectIteration.features.push(featureToAdd);
        }
      });
    });
    this.saveProjectsToStorage();
    this.saveFeaturesToStorage();
  }

  deleteProject(projectName) {
    const position = this.projectList.findIndex(project => project.name === projectName);
    this.projectList.splice(position, 1);
    this.saveProjectsToStorage();
  }

  removeProjectFeature(projectName, featureName) {
    const project = this.projectList.find(p => p.name === projectName);
    const projectPosition = this.projectList.findIndex(p => p.name === project.name);
    const featurePosition = this.projectList[projectPosition].features.findIndex(feature => feature.name === featureName);
    project.features.splice(featurePosition, 1);
    this.saveProjectsToStorage();
  }

  public async getFeatures() {
    this.featuresList === null ? this.featuresList = [] : null;
    const features = await Storage.get({ key: this.FEATURES_STORAGE });
    this.featuresList = JSON.parse(features.value);
  }

  createFeature(feature: Feature) {
    this.featuresList === null ? this.featuresList = [] : null;
    this.featuresList.unshift(feature);
    this.saveFeaturesToStorage();
  }

  saveFeaturesToStorage() {
    Storage.set({
      key: this.FEATURES_STORAGE,
      value: JSON.stringify(this.featuresList)
    });
  }

  editFeature(devHours: number, projectsNames: string[], featuresNames: string[]) {
    const featureToEdit = this.featuresList.find(feature => feature.name === featuresNames[0]);
    featureToEdit.devHours = devHours;
    this.addFeaturesToProjects(projectsNames, featuresNames);
  }

  deleteFeature(featureName) {
    const position = this.featuresList.findIndex(feature => feature.name === featureName);
    this.featuresList.splice(position, 1);
    this.saveFeaturesToStorage();
  }

}
