import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, NavParams, AlertController, LoadingController } from '@ionic/angular';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  //userService: UserService;
  signupForm: FormGroup;
  loading: LoadingController;

  constructor(
    private alertCtrl: AlertController,
    public authService: AuthenticationService,
    public formBuilder: FormBuilder,
    public loadingController: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService) {
    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])]
    })

  }

  ngOnInit() {
  }

  // onSubmit(): void {
  //   this.userService.create(this.signupForm.value).
  //   then(() => {
  //     console.log('Usuariocadastrado');
  //   })
  // }

  onSubmit(): void {

    let loading = this.showLoading();
    let formUser = this.signupForm.value;

    this.authService.createAuthUser({
      email: formUser.email,
      password: formUser.password
    }).then((authState: FirebaseAuthState) => {

      delete formUser.password;
      formUser.uid = authState.auth.uid;

      this.userService.create(formUser)
        .then(() => {
          console.log('Usuario cadastrado!');
          this.loading.dismiss();
        }).catch((error: any) => {
          console.log(error);
          this.loading.dismiss();
          this.showAlert(error);
        });

    }).catch((error: any) => {
      console.log(error);
      this.loading.dismiss();
      this.showAlert(error);
    });
  }

  private showLoading() {
    let loaderToShow = this.loadingController.create({
      message: 'This Loader will Not AutoHide'
    }).then((res) => {
      res.present();
      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed! after 2 Seconds');
      });
    });
    this.hideLoader();
    return loaderToShow;
  }

  private hideLoader() {
    setTimeout(() => {
      this.loadingController.dismiss();
    }, 4000);
  }

  async showAlert(message: string) {
    const alert = await this.alertCtrl.create({
      message: 'Atenção',
      subHeader: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
