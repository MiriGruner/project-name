import { Component, inject } from '@angular/core';
import { ItemsService } from '../../../Service/Items.service';
import { DonorServiceService } from '../../../Service/donor-service.service';
import { Donors } from '../../../models/donor.model';
import { Items } from '../../../models/Items.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RippleModule } from 'primeng/ripple';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog'; // ייבוא המודול של דיאלוג


@Component({
  selector: 'app-gift-manage',
  standalone: true,
  imports: [
    DialogModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    RippleModule,
  ],
  templateUrl: './gift-manage.component.html',
  styleUrls: ['./gift-manage.component.css'],
  providers: [MessageService, ConfirmationService]  // רישום השירותים ב-providers
})
export class GiftManageComponent {
  image: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  giftSrv: ItemsService = inject(ItemsService);
  donorSrv: DonorServiceService = inject(DonorServiceService);
  donor$: Donors[] = [];
  giftDialog: boolean = false;
  gifts$: Items[] = [];
  gift: Items = new Items();
  selectedGifts: Items[] = [];
  submitted: boolean = false;
  globalFilter: string = '';

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadGifts();  // מתאם ל-loadGifts (הפונקציה ב-Service)
    this.getDonor();   // מתאם ל-getDonor (הפונקציה ב-Service)
  }

  loadGifts() {
    this.giftSrv.loadGifts().subscribe((gifts) => {  // loadGifts מתואם לפונקציה ב-Service
      this.gifts$ = gifts;
      console.log('Gifts loaded:', this.gifts$);
    });
  }

  openNew() {
    this.gift = new Items();
    this.submitted = false;
    this.giftDialog = true;
  }

  editGift(gift: Items) {
    debugger;
    this.gift = { ...gift };
    this.giftDialog = true;
  }

  deleteSelectedGifts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected gifts?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        for (let selectedGift of this.selectedGifts) {
          this.giftSrv.deleteGift(selectedGift.id).subscribe({  // מתאם ל-deleteGift ב-Service
            next: () => {
              this.loadGifts();
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Gifts Deleted',
                life: 3000
              });
            },
            error: (err) => {
              console.error(err.error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: err.error ? 'למתנה יש כבר רוכשים:(' : 'Failed to delete gift.',
                life: 3000
              });
            }
          });
        }
        this.selectedGifts = [];
      }
    });
  }

  deleteGift(gift: Items) {
    debugger;
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${gift.name}?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.giftSrv.deleteGift(gift.id).subscribe({  // מתאם ל-deleteGift ב-Service
          next: () => {
            this.loadGifts();
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Gift Deleted',
              life: 3000
            });
          },
          error: (err) => {
            console.error(err.error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: err.error ? 'המתנה נרכשה😒' : 'Failed to delete gift.',
              life: 3000
            });
          }
        });
      }
    });
  }

  saveGift() {
    this.submitted = true;
    if (this.gift.name?.trim()) {
      if (this.gift.id) {
        this.giftSrv.updateGift(this.gift).subscribe(() => {  // מתאם ל-updateGift ב-Service
          this.loadGifts();
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Gift Updated',
            life: 3000
          });
        });
      } else {
        this.giftSrv.addGift(this.gift).subscribe(() => {  // מתאם ל-addGift ב-Service
          this.loadGifts();
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Gift Created',
            life: 3000
          });
        });
      }
      this.giftDialog = false;
      this.gift = new Items();
    }
  }

  hideDialog() {
    this.giftDialog = false;
    this.submitted = false;
  }

  getDonor() {
    // this.donorSrv.getAll().subscribe(donors => {
    //   this.donor$ = donors;
    // })
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.image = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
}
