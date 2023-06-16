import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../backend/models/User';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserModalComponent } from '../../components/user-modal/user-modal.component'
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
  users: User[] = [];

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

  openUserModal() {
    const modalRef = this.modalService.open(UserModalComponent);
    // modalRef.componentInstance.adminDashboardComponent = this;
    modalRef.result.then((result: any) => {
      // Le modal a été fermé, effectuer des actions supplémentaires si nécessaire
      if (result === 'success') {
        this.getUsers(); // Actualiser la liste des utilisateurs après la création réussie
      }
    }).catch((reason: any) => {
      // Le modal a été fermé avec une raison spécifique, gérer les cas d'annulation
    });
  }

  createUser(user: User) {
    this.userService.createUser(user).subscribe(() => {
      // Utilisateur créé avec succès
      // Vous pouvez afficher une notification ou effectuer des actions supplémentaires
    }, (error: Error) => {
      // Erreur lors de la création de l'utilisateur
      // Vous pouvez gérer l'erreur et afficher un message approprié
    });
  }
}
