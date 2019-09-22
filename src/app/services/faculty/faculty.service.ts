import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {Faculty} from '../../models/faculty';
import {redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import {AssignSubFaculty} from '../../models/AssignSubFaculty';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {
  facultyCollection: AngularFirestoreCollection<Faculty>;
  facultyDocument: AngularFirestoreDocument;
  faculty: Observable<Faculty[]>;
  faculties: Faculty[];
  name: string;
  email: string;
  id: string;
  f: number;
  facultyNames: string[] = [];
  assignSubFaculty: AssignSubFaculty[];

  constructor(public afs: AngularFirestore) {
    this.facultyCollection = this.afs.collection('faculty', ref => ref.orderBy('name', 'asc'));

    this.faculty = this.facultyCollection.snapshotChanges().pipe(map(changes => {
      return changes.map( a => {
        const  data = a.payload.doc.data() as Faculty;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  getFaculty() {
    return this.faculty;
  }

  addFaculty(faculty: Faculty) {
    this.facultyDocument = this.afs.collection('faculty').doc(faculty.id);
    this.facultyDocument.set(faculty).then(r => console.log('Added Faculty details', faculty));
  }

  getFacultyName(faculty: Faculty[]) {
    const n = faculty.length;
    console.log(faculty.length);
    this.f = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < this.facultyNames.length; j++) {
        if ( faculty[i].name === this.facultyNames[j]) {
          this.f++;
        }
      }
      if (this.f === 0) {
        this.facultyNames.push(faculty[i].name);
      }
    }
    console.log(this.facultyNames);
    return this.facultyNames;
  }

  setFaculty(faculty: Faculty[]) {
    this.faculties = faculty;
    console.log('log', this.faculties);
  }

  putFaculties(faculties: Faculty[]) {
    for (let i = 0; i < faculties.length; i++) {
      this.facultyCollection.doc(faculties[i].id).update(faculties[i]).then(r => console.log(faculties[i].name + ' updated!'));
    }
  }

  // assignSub() {
  //   this.assignSubFaculty = [{
  //     sub:
  //   }];
  // }
}
