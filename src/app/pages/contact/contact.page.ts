import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  public contacts: Contact[];
  public listMode: boolean = true;
  public filter: string = "";

  constructor(
    private service: DataService
  ) { }

  ngOnInit() {
    this.service.getContacts()
      .subscribe(
        (res: any) => {
          this.contacts = res;
        }
      );
  }

  toogleMode() {
    this.listMode = !this.listMode;
  }

}
