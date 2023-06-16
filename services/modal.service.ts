import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalRef: NgbModalRef | null = null;

  constructor(private modalService: NgbModal) {}

  open(component: any) {
    this.modalRef = this.modalService.open(component);
    this.modalRef.result.then(
      (result) => {
        // Le modal a été fermé, effectuez des actions supplémentaires si nécessaire
      },
      (reason) => {
        // Le modal a été fermé avec une raison spécifique, gérez les cas d'annulation
      }
    );
  }

  close(): void {
    if (this.modalRef) {
      this.modalRef.close();
      this.modalRef = null;
    }
  }
}
