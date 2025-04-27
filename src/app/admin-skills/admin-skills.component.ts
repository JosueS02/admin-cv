import { Component } from '@angular/core';
import { SkillsService } from '../services/skills-service/skills.service';
import { Skills } from '../models/skills/skill.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-skills',
  templateUrl: './admin-skills.component.html',
  styleUrl: './admin-skills.component.css'
})
export class AdminSkillsComponent {
  skills: Skills[] = [];
  mySkill: Skills = {}; // Usar {} en lugar de new Skills()
  isEditing: boolean = false;
  currentSkillId: string | null = null;
  btntxt: string = "Guardar"; // Texto inicial del botón

  constructor(public skillsService: SkillsService) {
    this.loadSkills();
  }

  loadSkills() {
    this.skillsService.getSkill().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data() as Skills // Asegurar tipado
        }))
      )
    ).subscribe(data => {
      this.skills = data;
      console.log(this.skills);
    });
  }

  AgregarSkill() {
    if (this.isEditing && this.currentSkillId) {
      this.skillsService.updateSkill(this.currentSkillId, this.mySkill).then(() => {
        console.log('Skill updated successfully!');
        this.resetForm();
      });
    } else {
      this.skillsService.createSkill(this.mySkill).then(() => {
        console.log('Created new skill successfully!');
        this.resetForm();
      });
    }
  }

  editSkill(skill: Skills) {
    this.isEditing = true;
    this.currentSkillId = skill.id || null;
    this.mySkill = { ...skill }; // Clona el objeto
    this.btntxt = "Guardar Cambios";
  }

  deleteSkill(id?: string) {
    this.skillsService.deleteSkill(id).then(() => {
      console.log('Skill deleted successfully!');
    });
  }

  resetForm() {
    this.mySkill = {};
    this.isEditing = false;
    this.currentSkillId = null;
    this.btntxt = "Guardar";
  }
}