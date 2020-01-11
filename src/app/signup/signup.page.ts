import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
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
  validations_form: FormGroup;
 
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
    public navCtrl: NavController) {
    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

  }

  ngOnInit() {
 
    this.validations_form = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      username: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      mail: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ]))
    });
  }

  // onSubmit(): void {
  //   this.userService.create(this.signupForm.value).
  //   then(() => {
  //     console.log('Usuariocadastrado');
  //   })
  // }

  tryRegister(value) {
    this.authService.registerUser(value.mail, value.password)
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
