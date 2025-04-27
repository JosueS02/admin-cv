import { Component } from '@angular/core';
import { InterestsService } from '../services/interest-service/interest.service';
import { Interest } from '../models/interest/interest.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-interests',
  templateUrl: './admin-interests.component.html',
  styleUrl: './admin-interests.component.css'
})
export class AdminInterestsComponent {

  myInterests: Interest = {}; // Usar {} en lugar de new Interest()
  interests: Interest[] = [];
  isEditing: boolean = false;
  currentInterestId: string | null = null;
  btntxt: string = "Guardar";

  constructor(public interestsService: InterestsService) {
    this.loadInterests();
  }

  loadInterests() {
    this.interestsService.getInterests().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data() as Interest
        }))
      )
    ).subscribe(data => {
      this.interests = data;
      console.log(this.interests);
    });
  }

  AregarInterest() {
    if (this.isEditing && this.currentInterestId) {
      this.interestsService.updateInterest(this.currentInterestId, this.myInterests).then(() => {
        console.log('Interests updated successfully!');
        this.resetForm();
      });
    } else {
      this.interestsService.createInterests(this.myInterests).then(() => {
        console.log('created new item successfully');
        this.resetForm();
      });
    }
  }

  editInterest(interest: Interest) {
    this.isEditing = true;
    this.currentInterestId = interest.id || null;
    this.myInterests = { ...interest };
    this.btntxt = "Guardar Cambios";
  }

  deleteInterest(id?: string) {
    this.interestsService.deleteInterests(id).then(() => {
      console.log('delete item successfully');
    });
  }

  resetForm() {
    this.myInterests = {};
    this.isEditing = false;
    this.currentInterestId = null;
    this.btntxt = "Guardar";
  }
}