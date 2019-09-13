import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ContactPage } from './contact.page';
import { ContactCardComponent } from 'src/app/components/contact-card/contact-card.component';
import { ContactListComponent } from 'src/app/components/contact-list/contact-list.component';
import { ContactFilterPipe } from 'src/app/pipes/ContactFilter.Pipe';

const routes: Routes = [
  {
    path: '',
    component: ContactPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ContactPage,
    ContactCardComponent,
    ContactListComponent,
    ContactFilterPipe
  ]
})
export class ContactListPageModule { }
