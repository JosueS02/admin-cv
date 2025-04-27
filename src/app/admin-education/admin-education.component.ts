import { Component } from '@angular/core';
 import { EducationService } from '../services/education-service/education.service';
 import { Education } from '../models/education/education.model';
 import { map } from 'rxjs/operators';

 @Component({
  selector: 'app-admin-education',
  templateUrl: './admin-education.component.html',
  styleUrl: './admin-education.component.css'
 })
 export class AdminEducationComponent {
  itemCount: number = 0;
  btntxt: string = "Agregar";
  goalText: string = "";
  education: Education[] = [];
  myEducation: Education = {}; // Usamos la interfaz Education
  isEditing: boolean = false;
  currentEducationId: string | null = null;

  constructor(public educationService: EducationService) {
    this.loadEducation();
  }

  loadEducation() {
    this.educationService.getEducation().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data() as Education // Añadimos el tipo Education aquí
        }))
      )
    ).subscribe(data => {
      this.education = data;
      console.log(this.education);
    });
  }

  AgregarEducation() {
    if (this.isEditing && this.currentEducationId) {
      this.educationService.updateEducation(this.currentEducationId, this.myEducation).then(() => {
        console.log('Updated education successfully!');
        this.resetForm();
      });
    } else {
      this.educationService.createEducation(this.myEducation).then(() => {
        console.log('Created new education successfully!');
        this.resetForm();
      });
    }
  }

  editEducation(edu: Education) {
    this.isEditing = true;
    this.currentEducationId = edu.id || null;
    this.myEducation = { ...edu };
    this.btntxt = "Guardar Cambios";
  }

  deleteEducation(id?: string) {
    this.educationService.deleteEducation(id).then(() => {
      console.log('delete item succesfully');
    });
    console.log(id);
  }

  resetForm() {
    this.myEducation = {};
    this.isEditing = false;
    this.currentEducationId = null;
    this.btntxt = "Agregar";
  }
 }