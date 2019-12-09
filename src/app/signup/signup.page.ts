import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, NavParams, AlertController, LoadingController } from '@ionic/angular';
import { UserService } from '../user.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  //userService: UserService;
  loading: LoadingController;

  errorMessage: string = '';
  successMessage: string = '';
 
  validation_messages = {
   'email': [
     { type: 'required', message: 'Email is required.' },
     { type: 'pattern', message: 'Enter a valid email.' }
   ],
   'password': [
     { type: 'required', message: 'Password is required.' },
     { type: 'minlength', message: 'Password must be at least 5 characters long.' }
   ]
 };

  constructor(
    private alertCtrl: AlertController,
    public authService: AuthenticationService,
    public formBuilder: FormBuilder,
    public loadingController: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService) {
    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

  }

  ngOnInit() {
  }

  // onSubmit(): void {
  //   this.userService.create(this.signupForm.value).
  //   then(() => {
  //     console.log('Usuariocadastrado');
  //   })
  // }

  tryRegister(value) {
    this.authService.registerUser(value)
    .then(res => {
      console.log(res);
      this.errorMessage = "";
      this.successMessage = "Your account has been created. Please log in.";
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.successMessage = "";
    })
  }

  goLoginPage(){
    this.navCtrl.navigateBack('');
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
