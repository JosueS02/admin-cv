import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Interest } from '../../models/interest/interest.model';

@Injectable({
  providedIn: 'root'
})
export class InterestsService {
  accessoInterests = 'Interests Service is Running';
  private dbPath = '/interest';
  interestsRef : AngularFirestoreCollection<Interest>;
  
  constructor(private db : AngularFirestore) { 
    this.interestsRef = db.collection(this.dbPath);
  }

  getInterests(): AngularFirestoreCollection<Interest>{
    return this.interestsRef;
  }

  createInterests(myInterest : Interest) : any {
    return this.interestsRef.add({...myInterest});
  }

  updateInterest(id: string, data: Interest): Promise<void> {
    return this.interestsRef.doc(id).update(data);
  }

  deleteInterests(id? : string) : Promise<void>{
    return this.interestsRef.doc(id).delete();
  }
}