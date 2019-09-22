import { Component, OnInit } from '@angular/core';
import {ClassService} from '../../services/class/class.service';
import {Class} from '../../models/class';
import {FacultyService} from '../../services/faculty/faculty.service';
import {Faculty} from '../../models/faculty';
import {MatSelect} from '@angular/material';
import {SubFaculty} from '../../models/SubFaculty';
import {AssignSubFaculty} from '../../models/AssignSubFaculty';

@Component({
  selector: 'app-assign-faculty',
  templateUrl: './assign-faculty.component.html',
  styleUrls: ['./assign-faculty.component.css']
})
export class AssignFacultyComponent implements OnInit {
  editStatus = false;
  selectedClass: string;
  selectedStaff: string[] = [];
  cseA: Class = this.classService.class;
  faculty: Faculty[];
  fac: Faculty;
  facultyNames: string[] = [];
  subFaculty: SubFaculty = {};
  subFaculties: SubFaculty[];
  chosenFaculty: string[] = [];
  assignedSubFaculty: AssignSubFaculty[] = [];

  constructor(private classService: ClassService, private facultyService: FacultyService) { }

  ngOnInit() {
    this.facultyService.getFaculty().subscribe(faculties => {
      this.faculty = faculties;
      this.facultyNames = this.facultyService.getFacultyName(this.faculty);
      console.log('name:', this.faculty[0].name);
    });

    this.classService.getSubFaculty().subscribe(subFaculty => {
      this.subFaculty = subFaculty[0];
      this.classService.putSubFaculty(this.subFaculty);
    });

    this.classService.getClass().subscribe( classes => {
      this.cseA = classes[0];
    });

  }

  clearState(value) {
    console.log(this.selectedStaff, value);
    for ( let i = 0; i < value.length; i++) {
      value[i] = null;
    }
    console.log(this.selectedStaff, value);
  }

  optionChange(faculty: string, i: number, sub: string) {
    for (let j = 0; j < this.faculty.length; j++) {
      if (this.faculty[j].name === faculty) {
        this.faculty[j].assignedSub += ' ' + sub;
        console.log(this.faculty[j]);
      }
    }
    this.chosenFaculty[i] = faculty;
    console.log(i, this.chosenFaculty[i]);
    // console.log('faculty: ', this.faculty[0]);
  }

  applyChanges() {
    console.log(this.chosenFaculty);
    this.assignChanges(this.chosenFaculty);
    this.facultyService.putFaculties(this.faculty);
    this.editStatus = !this.editStatus;
  }

  assignChanges(chosenFaculty: string[]) {
    this.subFaculty.csc = chosenFaculty[0];
    this.subFaculty.cc = chosenFaculty[1];
    this.subFaculty.mad = chosenFaculty[2];
    this.subFaculty.spm = chosenFaculty[3];
    this.subFaculty.agile = chosenFaculty[4];
    this.subFaculty.dwdm = chosenFaculty[5];
    this.subFaculty.ccLab = chosenFaculty[6];
    this.subFaculty.madLab = chosenFaculty[7];
    this.subFaculty.miniProject = chosenFaculty[8];
    console.log('Faculty: ', this.subFaculty);
    this.classService.putSubFaculty(this.subFaculty);
  }
  editField() {
    this.editStatus = !this.editStatus;
  }

  fillField(sub: string, i: number): string {
    switch (i) {
      case 0: return sub + ' : ' + this.subFaculty.csc; break;
      case 1: return sub + ' : ' + this.subFaculty.cc; break;
      case 2: return sub + ' : ' + this.subFaculty.mad; break;
      case 3: return sub + ' : ' + this.subFaculty.spm; break;
      case 4: return sub + ' : ' + this.subFaculty.agile; break;
      case 5: return sub + ' : ' + this.subFaculty.dwdm; break;
      case 6: return sub + ' : ' + this.subFaculty.ccLab; break;
      case 7: return sub + ' : ' + this.subFaculty.madLab; break;
      case 8: return sub + ' : ' + this.subFaculty.miniProject; break;
    }
  }

   print() {
     this.assignedSubFaculty = this.classService.getAssignedFaculty();
     console.log(this.assignedSubFaculty);
   }
}
