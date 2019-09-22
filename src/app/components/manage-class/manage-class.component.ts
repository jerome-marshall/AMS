import { Component, OnInit } from '@angular/core';
import {Class} from '../../models/class';
import {ClassService} from '../../services/class/class.service';
import {TimeTable} from '../../models/timeTable';
import { TimetableService } from 'src/app/services/timetable/timetable.service';

@Component({
  selector: 'app-manage-class',
  templateUrl: './manage-class.component.html',
  styleUrls: ['./manage-class.component.css']
})
export class ManageClassComponent implements OnInit {
   default = 'Tuesday';
   editStatus = false;
   class: Class;
   classSub: string[] = [];
   data: TimeTable[] = [];
 displayedColumns: string[] = ['day', 'pOne', 'pTwo', 'pThree', 'pFour', 'pFive', 'pSix', 'pSeven'];

constructor(private classService: ClassService, private timetableService: TimetableService) {
     this.class = classService.getClass();
     this.classSub = this.class.sub;
  }

 selectionChange(sub: string, n: number, i: number) {
    this.data[n].period[i - 1] = sub;
    console.log(this.data[n].day, this.data[n].period);
   }

setTimetable() {
    this.timetableService.setTimetable(this.data);
    console.log('Data is passed to be set');
    this.editStatus = !this.editStatus;
  }

 editTimetable() {
    this.editStatus = !this.editStatus;
    console.log('Edit Status: ', this.editStatus);
 }

 setData(n: number, i: number): string {
    return this.data[n].period[i];
 }

ngOnInit() {
    this.timetableService.getTimetable().subscribe(data => {
      this.data = data;
      console.log(data);
    });
  }

}
