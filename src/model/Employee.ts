export class Employee {
  id: number;
  fname: string;
  lname: string;
  age: number;
  club: string;
  goals_scored?: number;
  nationality?: string;

  constructor(id: number, fname: string, lname: string, age: number, club: string, goalsScored: number, nationality: string){
    this.id = id;
    this.fname = fname;
    this.lname = lname;
    this.age = age;
    this.club = club;
    this.goals_scored = goalsScored;
    this.nationality = nationality;

  }
}
