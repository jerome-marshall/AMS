import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { TimeTable } from 'src/app/models/timeTable';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {
  timetableCollection: AngularFirestoreCollection;
  timetableDocument: AngularFirestoreDocument;
  studTimetable: Observable<TimeTable[]>;

  constructor(public afs: AngularFirestore) {
    this.timetableCollection = this.afs.collection('timetable');
    // this.timetableDocument = this.afs.collection('timetable').doc('cse a');

    this.studTimetable = this.timetableCollection.snapshotChanges().pipe(map(changes => {
      return changes.map( a => {
        const  data = a.payload.doc.data() as TimeTable;
        return data;
      });
    }));
   }

   setTimetable(data: TimeTable[]) {
     for(let i=0; i<6; i++){
      this.timetableCollection.doc(i.toString(10)).set(data[i]).then(r => console.log('Data set!', i));
    }
   }

   getTimetable() {
      return this.studTimetable;
   }
}
