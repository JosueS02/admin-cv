import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminWorkexperienceComponent } from './admin-workexperience/admin-workexperience.component'; // Asegúrate de la ruta correcta
import { AdminHeaderComponent } from './admin-header/admin-header.component'; // Asegúrate de la ruta correcta
import { AdminEducationComponent } from './admin-education/admin-education.component'; // Asegúrate de la ruta correcta
import { AdminCertificatesComponent } from './admin-certificates/admin-certificates.component';
import { AdminSkillsComponent } from './admin-skills/admin-skills.component';
import { AdminLanguagesComponent } from './admin-languages/admin-languages.component';
import { AdminInterestsComponent } from './admin-interests/admin-interests.component';


const routes: Routes = [
  { path: 'work-experience', component: AdminWorkexperienceComponent }, // Aquí asociamos la ruta con tu componente
  { path: 'header', component: AdminHeaderComponent }, // Aquí asociamos la ruta con tu componente
  { path: 'education', component: AdminEducationComponent }, // Aquí asociamos la ruta con tu componente
  { path: 'certificates', component: AdminCertificatesComponent },
  { path: 'skills', component: AdminSkillsComponent },
  { path: 'languages', component: AdminLanguagesComponent },
  { path: 'interests', component: AdminInterestsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }