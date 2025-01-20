import { Component, inject } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Donors } from '../../../models/donor.model';
import { DonorServiceService } from '../../../Service/donor-service.service';
import { DialogModule } from 'primeng/dialog';  // Import DialogModule
import { TableModule } from 'primeng/table';    // Import TableModule
import { ButtonModule } from 'primeng/button';  // Import ButtonModule
import { ToastModule } from 'primeng/toast';    // Import ToastModule
import { FormsModule } from '@angular/forms';   // Import FormsModule for ngModel
import { ConfirmDialogModule } from 'primeng/confirmdialog'; // Import ConfirmDialogModule
import { ToolbarModule } from 'primeng/toolbar';  // Import ToolbarModule
import { ROUTES } from '@angular/router';
import { DonorListComponent } from '../../../donor-list/donor-list.component';
import { MessageService } from 'primeng/api'; 

@Component({
  selector: 'app-donoor-management',
  templateUrl: './donor-management.component.html',
  styleUrls: ['./donor-management.component.css'],
  providers: [MessageService,ConfirmationService],
  standalone: true,
  imports: [
    DialogModule,
    TableModule,
    ButtonModule,
    ToastModule,
    FormsModule,
    ConfirmDialogModule,
    ToolbarModule,
  
  ]
})
export class DonorManageComponent {
  donorSrv: DonorServiceService = inject(DonorServiceService);
  donors$: Donors[] = [];
  donorDialog: boolean = false;  // Make sure dialog is initially closed
  donor: Donors = { id: 0, name: '', email: '', phone: '', donor: '' };
  selectedDonors: Donors[] = [];
  submitted: boolean = false;
  globalFilter: string = '';

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    // Don't load data automatically here
    // this.loadDonors();
  }

  loadDonors() {
    this.donorSrv.getAll().subscribe(donors => {
      this.donors$ = donors;
    });
  }

  openNew() {
    this.donor = { id: 0, name: '', email: '', phone: '', donor: '' };
    this.submitted = false;
    this.donorDialog = true;
  }

  editDonor(donor: Donors) {
    this.donor = { ...donor };
    this.donorDialog = true;
  }

  deleteSelectedDonors() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected donors?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedDonors.forEach(donor => {
          this.donorSrv.delete(donor.id).subscribe(() => {
            this.loadDonors();
          });
        });
        this.selectedDonors = [];
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Donors Deleted', life: 3000 });
      }
    });
  }

  deleteDonor(donor: Donors) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${donor.name}?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.donorSrv.delete(donor.id).subscribe(() => {
          this.loadDonors();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Donor Deleted', life: 3000 });
        });
      }
    });
  }

  saveDonor() {
    this.submitted = true;
    if (this.donor.name.trim()) {
      if (this.donor.id) {
        this.donorSrv.update(this.donor).subscribe(() => {
          this.loadDonors();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Donor Updated', life: 3000 });
        });
      } else {
        this.donorSrv.add(this.donor).subscribe(() => {
          this.loadDonors();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Donor Created', life: 3000 });
        });
      }
      this.donorDialog = false;
      this.donor = { id: 0, name: '', email: '', phone: '', donor: '' };
    }
  }

  hideDialog() {
    this.donorDialog = false;
    this.submitted = false;
  }
}
