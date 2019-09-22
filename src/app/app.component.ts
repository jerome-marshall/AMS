import {Component, OnInit} from '@angular/core';
import {ClassService} from './services/class/class.service';
import {FacultyService} from './services/faculty/faculty.service';
import {Faculty} from './models/faculty';
import {TimeTable} from './models/timeTable';
import {TimetableService} from './services/timetable/timetable.service';
import {SubFaculty} from './models/SubFaculty';
import {AssignSubFaculty} from './models/AssignSubFaculty';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AMS';
  faculty: Faculty[];
  dataTimetable: TimeTable[] = [];
  subFaculty: SubFaculty = {};
  assignedSubFaculty: AssignSubFaculty[] = [];

  constructor(private classService: ClassService, private facultyService: FacultyService, private timetableService: TimetableService) {

  }

  ngOnInit(): void {
    this.facultyService.getFaculty().subscribe(faculties => {
      this.faculty = faculties;
    });

    this.timetableService.getTimetable().subscribe(data => {
      this.dataTimetable = data;
      console.log(data);
    });

    this.classService.getSubFaculty().subscribe(subFaculty => {
      this.subFaculty = subFaculty[0];
      this.classService.putSubFaculty(this.subFaculty);
    });

    this.assignedSubFaculty = this.classService.getAssignedFaculty();
    console.log(this.assignedSubFaculty);
  }
}
