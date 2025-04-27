import { Component } from '@angular/core';
import { CertificatesService } from '../services/certificates-service/certificates.service';
import { Certificates } from '../models/certificates/certificate.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-certificates',
  templateUrl: './admin-certificates.component.html',
  styleUrl: './admin-certificates.component.css'
})
export class AdminCertificatesComponent {


  itemCount: number = 0;
  btntxt: string = "Agregar";
  goalText: string = "";
  certificates: Certificates[] = [];
  myCertificates: Certificates = {}; // Usar {} en lugar de new Certificates()
  isEditing: boolean = false;
  currentCertificateId: string | null = null;

  constructor(public certificatesService: CertificatesService) {
    this.loadCertificates();
  }

  loadCertificates() {
    this.certificatesService.getCertificate().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data() as Certificates // Asegurar tipado
        }))
      )
    ).subscribe(data => {
      this.certificates = data;
      console.log(this.certificates);
    });
  }

  AgregarCertificates() {
    if (this.isEditing && this.currentCertificateId) {
      this.certificatesService.updateCertificate(this.currentCertificateId, this.myCertificates).then(() => {
        console.log('Certificate updated successfully!');
        this.resetForm();
      });
    } else {
      this.certificatesService.createCertificate(this.myCertificates).then(() => {
        console.log('Create new item successfully!');
        this.resetForm();
      });
    }
  }

  editCertificate(cert: Certificates) {
    this.isEditing = true;
    this.currentCertificateId = cert.id || null;
    this.myCertificates = { ...cert }; // Clona el objeto
    this.btntxt = "Guardar Cambios";
  }

  deleteCertificate(id?: string) {
    this.certificatesService.deleteCertificate(id).then(() => {
      console.log('delete item successfully');
    });
    console.log(id);
  }

  resetForm() {
    this.myCertificates = {};
    this.isEditing = false;
    this.currentCertificateId = null;
    this.btntxt = "Agregar";
  }
}