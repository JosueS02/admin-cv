import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Languages } from '../../models/languages/language.model';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {
  
  accesoLanguages = 'Languagues Service is Running...';
  private dbPath = '/languages';
  languageRef: AngularFirestoreCollection<Languages>;

  constructor(private db:AngularFirestore) { 
    this.languageRef = db.collection(this.dbPath);
  }

  getLanguage() : AngularFirestoreCollection<Languages>{
    return this.languageRef;
  }

  createLanguage(myLanguage : Languages) : any {
    return this.languageRef.add({...myLanguage});
  }

  updateLanguage(id: string, data: Languages): Promise<void> {
    return this.languageRef.doc(id).update(data);
  }

  deleteLanguage(id? : string) : Promise <void>{
    return this.languageRef.doc(id).delete();
  }
}