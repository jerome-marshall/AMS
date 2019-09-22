import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user: User;
  uID: string;

  constructor(public afAuth: AngularFireAuth) { }

  async signUp(email: string, password: string) {
    const result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(user => {
       return  user.user.uid;
    });
    console.log('uid: ', result);
    return  result;
  }

  getUid() {
    return this.user.uid;
  }

}
