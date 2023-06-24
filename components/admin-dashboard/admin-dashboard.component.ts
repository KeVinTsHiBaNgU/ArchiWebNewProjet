import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../backend/models/User';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: 'admin-dashboard.component.html',
})
export class AdminDashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();

  dtOptions: any = {};

  userForm!: FormGroup;
  users: any[] = [];

  constructor(private userService: UserService, private modalService: NgbModal, private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.getUsers();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
      buttons: ['copy', 'csv', 'excel', 'pdf', 'print'],
     
    };
  

}
  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }

    const userData = {
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      email: this.userForm.value.email,
      role: this.userForm.value.role,
    };
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      // @ts-ignore
      this.datatableElement.dtTrigger.next();
    });
  }


  ngOnDestroy(): void {
    this.datatableElement.dtTrigger.unsubscribe();
  }

  getUsers() {
    this.userService.getUsers().subscribe((users) => {
      // Filtrer les utilisateurs par rôle (enseignant et étudiant)
      this.users = users.filter((user) => user.role === 'teacher' || user.role === 'student');
    });
  }


}
