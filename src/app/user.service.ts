import { Injectable } from '@angular/core';
import { User } from 'firebase';
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

  create(user: User): firebase.Promise<DocumentReference> {
    return this.af.collection('/users').add(user);
  }
}
