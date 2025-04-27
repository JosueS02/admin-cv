import { Component } from '@angular/core';
import { LanguagesService } from '../services/languages-service/languages.service';
import { Languages } from '../models/languages/language.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-languages',
  templateUrl: './admin-languages.component.html',
  styleUrl: './admin-languages.component.css'
})
export class AdminLanguagesComponent {
  languages: Languages[] = [];
  myLanguage: Languages = {}; // Usar {} en lugar de new Languages()
  isEditing: boolean = false;
  currentLanguageId: string | null = null;
  btntxt: string = "Guardar";

  constructor(public languagesService: LanguagesService) {
    this.loadLanguages();
  }

  loadLanguages() {
    this.languagesService.getLanguage().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data() as Languages
        }))
      )
    ).subscribe(data => {
      this.languages = data;
      console.log(this.languages);
    });
  }

  AgregarLanguage() {
    if (this.isEditing && this.currentLanguageId) {
      this.languagesService.updateLanguage(this.currentLanguageId, this.myLanguage).then(() => {
        console.log('Language updated successfully!');
        this.resetForm();
      });
    } else {
      this.languagesService.createLanguage(this.myLanguage).then(() => {
        console.log('Created a new language successfully');
        this.resetForm();
      });
    }
  }

  editLanguage(lang: Languages) {
    this.isEditing = true;
    this.currentLanguageId = lang.id || null;
    this.myLanguage = { ...lang };
    this.btntxt = "Guardar Cambios";
  }

  deleteLanguage(id?: string) {
    this.languagesService.deleteLanguage(id).then(() => {
      console.log('delete item successfully');
    });
    console.log(id);
  }

  resetForm() {
    this.myLanguage = {};
    this.isEditing = false;
    this.currentLanguageId = null;
    this.btntxt = "Guardar";
  }
}