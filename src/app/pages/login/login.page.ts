import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserUtil } from 'src/app/Utils/user.util';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private service: DataService,
    private toastCtrl: ToastController
  ) {
    this.form = this.fb.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])],
    });
  }

  ngOnInit() {
    const user = UserUtil.get();
    if (user) this.navCtrl.navigateRoot('/');
  }

  async submit() {
    const loading = await this.loadingCtrl.create({ message: "Autenticando..." });
    loading.present();

    this.service.auth(this.form.value)
      .subscribe(
        (res: any) => {
          loading.dismiss();
          this.showSuccess(res);
        },
        (err: any) => {
          loading.dismiss();
          console.log(err);
          this.showError('Usuário ou senha inválidos');
        },
      );
  }


  async showSuccess(user) {
    UserUtil.set(user);
    this.navCtrl.navigateRoot('/');
  }

  async showError(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      showCloseButton: true,
      closeButtonText: 'Fechar',
    });
    toast.present();
  }

}
