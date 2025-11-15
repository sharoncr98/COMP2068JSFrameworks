import { Component } from '@angular/core';
import { ProjectService } from '../services/project.service'
@Component({
  selector: 'app-project',
  standalone: false,
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent {
  projects: any; //data for ui
  constructor(private projectService: ProjectService){}

  ngOnInit(): void{
    this.getProjects();
  }

  // method to call service
  getProjects(): void {
    this.projectService.getProjects().subscribe(data =>{
      this.projects = data;
    });
  }
}
