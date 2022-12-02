import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {map} from 'rxjs/operators'
import {Observable} from 'rxjs'
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  public students:Student[];
  constructor(private firestore:AngularFirestore) { }
  
  public getStudentById(id:string){
      let result = this.firestore.collection("students").doc(id).valueChanges();
      return result;
  }
  public getStudents():Observable<Student[]>{
    return this.firestore.collection('students').snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Student;
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    })
    );
  }
  public removeStudent(id:string){
    this.firestore.collection("students").doc(id).delete();
  }
  public newStudent(student:Student){
    return this.firestore.collection("students").add(student);
  }
   public async updateStudent(student:Student,id: string){
    console.log(student.name);
    console.log(id);
    try{
       let result = await this.firestore.collection("students").doc(id).update(student);
      return result
    }catch(err){
      console.log(err);
      return null;
    }
  }

}
