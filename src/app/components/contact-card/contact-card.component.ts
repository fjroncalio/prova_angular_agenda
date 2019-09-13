import { Component, OnInit, Input } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { NavController, LoadingController } from '@ionic/angular';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss'],
})
export class ContactCardComponent implements OnInit {
  @Input() contacts: Contact[] = [];
  constructor(
    private service: DataService,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() { }

  async remove(contact: Contact) {
    const loading = await this.loadingCtrl.create({ message: "Carregando..." });
    loading.present();

    this
      .service
      .deleteContact(contact.id)
      .subscribe(
        (res: any) => {
          const index = this.contacts.indexOf(contact);
          this.contacts.splice(index, 1);
          loading.dismiss();
        },
        (err: any) => {
          loading.dismiss();
        }
      );

  }

}
