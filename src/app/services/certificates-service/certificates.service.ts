import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Certificates } from '../../models/certificates/certificate.model';

@Injectable({
  providedIn: 'root'
})
export class CertificatesService {
  
   private dbPath = '/certificates';
   certificateRef : AngularFirestoreCollection<Certificates>;

  constructor(private db : AngularFirestore) {
    this.certificateRef =  db.collection(this.dbPath);
   }

   getCertificate(): AngularFirestoreCollection<Certificates>{
    return this.certificateRef;
   }

   createCertificate(myCertificate : Certificates) : any {
    return this.certificateRef.add({...myCertificate});
   }

  updateCertificate(id: string, data: Certificates): Promise<void> {
    return this.certificateRef.doc(id).update(data);
  }

   deleteCertificate(id? : string) : Promise<void> {
      return this.certificateRef.doc(id).delete();
   }
}