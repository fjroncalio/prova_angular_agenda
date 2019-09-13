import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Contact } from './models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient
  ) { }

  auth(data: any) {
    return this.http.post(`${environment.apiUrl}login`, data);
  }

  createUser(data: any) {
    return this.http.post(`${environment.apiUrl}login`, data);
  }
  resetPassword(data: any) {
    return this.http.post(`${environment.apiUrl}resetPassword`, data);
  }

  getContacts() {
    return this.http.get(`${environment.apiUrl}contact`);
  }

  getContact(id: string) {
    return this.http.get(`${environment.apiUrl}contact/${id}`);
  }
  deleteContact(id: string) {
    return this.http.delete(`${environment.apiUrl}contact/${id}`);
  }

  insertContact(contact: Contact) {
    return this.http.post(`${environment.apiUrl}contact`, contact);
  }

  updateContact(contact: Contact) {
    return this.http.put(`${environment.apiUrl}contact/${contact.id}`, contact);
  }
}
