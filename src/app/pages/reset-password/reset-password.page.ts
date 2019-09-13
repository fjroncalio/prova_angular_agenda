import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  public form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: DataService,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  async submit() {
    const loading = await this.loadingCtrl.create({ message: "Autenticando..." });
    loading.present();

    this.service.resetPassword(this.form.value)
      .subscribe(
        (res: any) => {
          loading.dismiss();
          this.navCtrl.navigateRoot("/login");
        },
        (err: any) => {
          loading.dismiss();
          console.log(err);
        },
      );
  }
}
