import { Student } from './../models/student';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public students: Student[];
  constructor(private studentService: StudentService, private router: Router, private alertController: AlertController) {
    this.studentService.getStudents().subscribe(res => {
      this.students = res;
    });
  }

  public getStudentById(id: string) {
    this.router.navigate(['/view-student'], {
      queryParams: { id: id }
    });
  }
  public async removeStudent(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmacion',
      subHeader: '¿Estás seguro que deseas eliminar?',
      message: 'Esto es una confirmación',
      buttons: [
        {
          text: 'Cancelar',
          role: 'Cancel',
          handler: () => {

          }
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => {
            this.studentService.removeStudent(id);
          }
        }
      ]
    });

    await alert.present();

  }
  public newStudent(){
    this.router.navigate(['/new-student'], {
    });
  }
  public updateStudent(id: string){
    this.router.navigate(['/update-student'], {
      queryParams: { id: id }
    });
  }

}
