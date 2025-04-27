import { Component } from '@angular/core';
 import { WorkExperienceService } from "../services/work-experience-service/work-experience.service";
 import { WorkExperience } from '../models/work-experience/work-experience.model';
 import { map } from 'rxjs/operators';

 @Component({
  selector: 'app-admin-workexperience',
  templateUrl: './admin-workexperience.component.html',
  styleUrl: './admin-workexperience.component.css'
 })
 export class AdminWorkexperienceComponent {
  itemCount: number = 0;
  btntxt: string ="Agregar";
  goaltext: string ="";
  workExperience: WorkExperience[] = [];
  myWorkExperience: WorkExperience = new WorkExperience();
  isEditing: boolean = false; // Variable para rastrear si estamos editando
  currentJobId: string | null = null; // Para almacenar el ID del trabajo que se está editando

  constructor (public workExperienceService: WorkExperienceService)
  {
   this.loadWorkExperience();
  }

  loadWorkExperience() {
   this.workExperienceService.getWorkExperience().snapshotChanges().pipe(
    map(changes =>
      changes.map(c =>
       ({ id: c.payload.doc.id, ...c.payload.doc.data() })
      )
    )
   ).subscribe(data => {
     this.workExperience = data;
     console.log(this.workExperience);
   });
  }

  AgregarJob(){
    if (this.isEditing && this.currentJobId) {
      // Lógica de actualización
      this.workExperienceService.updateWorkExperience(this.currentJobId, this.myWorkExperience).then(() => {
        console.log('Updated item successfully!');
        this.resetForm();
      });
    } else {
      // Lógica de creación
      this.workExperienceService.createWorkExperience(this.myWorkExperience).then(() => {
        console.log('Created new item successfully!');
        this.resetForm();
      });
    }
  }

  editJob(job: WorkExperience) {
    this.isEditing = true;
    this.currentJobId = job.id || null;
    this.myWorkExperience = { ...job }; // Clona el objeto para no modificar la lista directamente
    this.btntxt = "Guardar Cambios";
  }

  deleteJob(id? : string ){
    this.workExperienceService.deleteWorkExperience(id).then(() => {
      console.log('delete item  successfully!');
    });
  }

  resetForm() {
    this.myWorkExperience = new WorkExperience();
    this.isEditing = false;
    this.currentJobId = null;
    this.btntxt = "Agregar";
  }
 }