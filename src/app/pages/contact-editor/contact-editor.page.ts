import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/app/models/contact.model';
import { DataService } from 'src/app/data.service';
import { LoadingController } from '@ionic/angular';
import { CustomValidator } from 'src/app/validators/custom.validators';

@Component({
  selector: 'app-contact-editor',
  templateUrl: './contact-editor.page.html',
  styleUrls: ['./contact-editor.page.scss'],
})
export class ContactEditorPage implements OnInit {

  public form: FormGroup;
  private id: string;
  public contact: Contact;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: DataService,
    private loadingCtrl: LoadingController,
  ) {
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', CustomValidator.EmailValidator],
      cpf: ['', CustomValidator.isCpf],
      address: [''],
      image: ['']
    });

  }

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {

      const loading = await this.loadingCtrl.create({ message: "Carregando..." });
      loading.present();
      this
        .service
        .getContact(this.id)
        .subscribe(
          (res: any) => {
            this.contact = res;
            this.fillForm();
            loading.dismiss();
          }
        );
    }
  }

  fillForm() {
    this.form.controls['id'].setValue(this.contact.id);
    this.form.controls['name'].setValue(this.contact.name);
    this.form.controls['phone'].setValue(this.contact.phone);
    this.form.controls['email'].setValue(this.contact.email);
    this.form.controls['cpf'].setValue(this.contact.cpf);
    this.form.controls['address'].setValue(this.contact.address);
    this.form.controls['image'].setValue(this.contact.image);
  }

  async submit() {
    if (this.id)
      await this.update()
    else
      await this.insert();
  }

  async update() {

    const loading = await this.loadingCtrl.create({ message: "Carregando..." });
    loading.present();
    this
      .service
      .updateContact(this.form.value)
      .subscribe(
        (res: any) => {
          this.contact = res
          this.id = res.id;
          this.fillForm();

          loading.dismiss();
        }
      );
  }

  async insert() {

    const loading = await this.loadingCtrl.create({ message: "Carregando..." });
    loading.present();
    this
      .service
      .insertContact(this.form.value)
      .subscribe(
        (res: any) => {
          this.contact = res
          this.id = res.id;
          this.fillForm();

          loading.dismiss();
        }
      );
  }
}
