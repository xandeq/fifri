import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { isRejected } from 'q';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  registerUser(email, password){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        res => resolve(res),
        err => reject(err))
    })
  }

  loginUser(email, password){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        res => resolve(res),
        err => reject(err))
    })
   }

   logoutUser(){
     return new Promise((resolve, reject) => {
       if(firebase.auth().currentUser){
         firebase.auth().signOut()
         .then(() => {
           console.log("DESCONECTADO.");
           resolve();
         }).catch((error) => {
           reject();
         })
       }
     })
   }

   userDetails(){
     return firebase.auth().currentUser;
   }
}
