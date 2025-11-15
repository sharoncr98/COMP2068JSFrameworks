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
  _id!: any;
  name!: any;
  dueDate!: any;
  course!: any;
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
  // create new project
  addProject() : void {
    //create a new project using the info in the form fields
    let newProject = {
      name: this.name,
      dueDate: this.dueDate,
      course: this.course
    }
    // call the service
    this.projectService.addProject(newProject).subscribe(response=>{
      this.getProjects();
    });
        //clear form
      this.clearForm();
  }
    deleteProject(_id: any) : void {
      if (confirm('Are you sure you want to delete this project?')) {
        this.projectService.deleteProject(_id).subscribe(response =>{
          this.getProjects();
        })
      }
    }

    //select project then update
    selectProject(project: any){
      this._id = project._id;
      this.name = project.name;
      this.dueDate = project.dueDate;
      this.course = project.course;
    }

    updateProject(){

    }
    
    clearForm(): void {
      this._id = '';
      this.name = '';
      this.dueDate = '';
      this.course = '';
    }
}
