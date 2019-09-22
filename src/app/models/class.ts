import {Subjects} from './subjects';

export interface Class extends Subjects {
  dept?: string;
  sec?: string;
  regStud?: string[];
  latStud?: string[];
  regStudCount?: string;
  latStudCount?: string;
}
