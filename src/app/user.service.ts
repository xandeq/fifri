import { Injectable } from '@angular/core';
import { User, firestore } from 'firebase';
import { HTTP } from '@ionic-native/http/ngx';
import { AngularFirestore, DocumentReference, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(
    public db: AngularFirestore, 
    private http: HTTP) {
     }
}
