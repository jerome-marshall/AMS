import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Class} from '../../models/class';
import {SubFaculty} from '../../models/SubFaculty';
import {Faculty} from '../../models/faculty';
import {AssignSubFaculty} from '../../models/AssignSubFaculty';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  subFaculty: Observable<SubFaculty[]>;
  classCollection: AngularFirestoreCollection<Class>;
  classDocument: AngularFirestoreDocument;
  classSubFacultyDocument: AngularFirestoreDocument;
  classSubFacultyCollection: AngularFirestoreCollection;
  classes: Observable<Class[]>;
  class: Class;// {
  //   dept: 'CSE',
  //   sec: 'A',
  //   regStud: [],
  //   latStud: ['167', '168'],
  //   regStudCount: '60',
  //   latStudCount: '2',
  //   subCount: 9,
  //   sub: ['CSC', 'CC', 'MAD', 'SPM', 'AGILE', 'DWDM', 'CCLAB', 'MADLAB', 'MiniProject']
   // };
  chosenFaculty: string[] = [];
  assignedSubFaculty: AssignSubFaculty[] = [];

  constructor(public afs: AngularFirestore) {
    this.classCollection = this.afs.collection('class');
    this.classDocument = this.classCollection.doc('CSE A');
    this.classSubFacultyDocument = this.classCollection.doc('CSE A').collection('1').doc('subFaculty');
    this.classSubFacultyCollection = this.classCollection.doc('CSE A').collection('1');

    this.classes = this.classCollection.snapshotChanges().pipe(map(changes => {
      return changes.map( a => {
        const  data = a.payload.doc.data() as Class;
        return data;
      });
    }));

    this.subFaculty = this.classSubFacultyCollection.snapshotChanges().pipe(map(changes => {
      return changes.map( a => {
        return a.payload.doc.data() as SubFaculty;
      });
    }));
  }

  putClass(class1: Class) {
    this.classDocument.set(class1).then(r => console.log('Class Added!', class1));
  }

  putSubFaculty(subFaculty: SubFaculty) {
    this.subFaculty[0] = subFaculty;
    this.classSubFacultyDocument.set(subFaculty).then(r => console.log('SubFaculty Added!'));
    this.classSubFacultyDocument.update(subFaculty).then(r => console.log('SubFaculty Updated!'));
  }

  getSubFaculty() {
    return this.subFaculty;
  }

  getClass() {
    return this.classes;
  }

  getAssignedFaculty() {
    this.chosenFaculty[0] = this.subFaculty[0].csc;
    this.chosenFaculty[1] = this.subFaculty[0].cc;
    this.chosenFaculty[2] = this.subFaculty[0].mad;
    this.chosenFaculty[3] = this.subFaculty[0].spm;
    this.chosenFaculty[4] = this.subFaculty[0].agile;
    this.chosenFaculty[5] = this.subFaculty[0].dwdm;
    this.chosenFaculty[6] = this.subFaculty[0].ccLab;
    this.chosenFaculty[7] = this.subFaculty[0].madLab;
    this.chosenFaculty[8] = this.subFaculty[0].miniProject;

    this.assignedSubFaculty[0] = {sub: 'csc', staff: this.chosenFaculty[0]};
    this.assignedSubFaculty[1] = {sub: 'cc', staff: this.chosenFaculty[1]};
    this.assignedSubFaculty[2] = {sub: 'mad', staff: this.chosenFaculty[2]};
    this.assignedSubFaculty[3] = {sub: 'spm', staff: this.chosenFaculty[3]};
    this.assignedSubFaculty[4] = {sub: 'agile', staff: this.chosenFaculty[4]};
    this.assignedSubFaculty[5] = {sub: 'dwdm', staff: this.chosenFaculty[5]};
    this.assignedSubFaculty[6] = {sub: 'ccLab', staff: this.chosenFaculty[6]};
    this.assignedSubFaculty[7] = {sub: 'madLab', staff: this.chosenFaculty[7]};
    this.assignedSubFaculty[8] = {sub: 'miniProject', staff: this.chosenFaculty[8]};

    return this.assignedSubFaculty;
  }
}
