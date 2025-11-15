import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http:HttpClient){}

  getProjects(){
    return this.http.get('http://localhost:3000/api/projects')
  }
  //create a new project
  addProject(newProject: any){
    return this.http.post('http://localhost:3000/api/projects', newProject);
  }

  //delete project bi id
  deleteProject(_id: any) {
    return this.http.delete('http://localhost:3000/api/projects' + _id);
  }
}
