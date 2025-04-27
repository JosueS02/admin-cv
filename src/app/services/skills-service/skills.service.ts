import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Skills } from '../../models/skills/skill.model';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  private dbPath = '/skills';
  skillRef : AngularFirestoreCollection<Skills>;

  constructor(private db: AngularFirestore ) {
    this.skillRef = db.collection(this.dbPath);
   }

   getSkill() : AngularFirestoreCollection<Skills>{
     return this.skillRef;
   }

   createSkill(mySkill : Skills) : any {
     return this.skillRef.add({...mySkill});
   }

  updateSkill(id: string, data: Skills): Promise<void> {
    return this.skillRef.doc(id).update(data);
  }

   deleteSkill(id? : string) : Promise<void>{
    return this.skillRef.doc(id).delete();
   }
}