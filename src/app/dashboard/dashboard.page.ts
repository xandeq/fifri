import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { google } from '@google/maps';

declare var google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage implements OnInit {

  @ViewChild('map', { static: true }) mapRef: ElementRef;

  private map: google.maps.Map;
  private mapOptions: google.maps.MapOptions;

  usuario: any;
  userEmail: string;
  nome: string;

  constructor(
    private geolocation: Geolocation,
    private navCtrl: NavController,
    private authService: AuthenticationService
  ) { }

  private initMap(): void {
    this.geolocation.getCurrentPosition().then((resp) => {
      //console.log(resp);
      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

      this.mapOptions = {
        center: latLng,
        zoom: 16,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        gestureHandling: 'cooperative'
      };
      this.map = new google.maps.Map(this.mapRef.nativeElement, this.mapOptions);

      console.log(latLng);
      new google.maps.Marker({
        position: new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude),
        map: this.map,
      });
    });
  }

  ngOnInit() {
    console.log(this.usuario);
    this.initMap();
    if (this.authService.userDetails()) {
      this.userEmail = this.authService.userDetails().email;
      this.nome = this.authService.userDetails().displayName;
    } else {
      this.navCtrl.navigateBack('');
    }
  }

  logout() {
    this.authService.logoutUser()
      .then(res => {
        console.log(res);
        this.navCtrl.navigateBack('');
      })
      .catch(error => {
        console.log(error);
      })
      
  }

  getUsuario() {
   this.usuario = this.authService.userDetails;
  }
}