import { Component, Input } from '@angular/core';
import { Donors } from '../models/donor.model';
import { DonorServiceService } from '../Service/donor-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-donor',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-donor.component.html',
  styleUrls: ['./update-donor.component.css']  // תיקון ל-styleUrls
})
export class UpdateDonorComponent {
  // הוספת שדה donor
  donors: Donors = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    donor: '' // הוספתי את השדה donor כאן
  };

  isEditMode: boolean = true;

  // הוספת שדה donor גם כאן
  @Input() donor2: Donors = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    donor: '' // הוספתי את השדה donor כאן
  };

  constructor(private donorService: DonorServiceService) {}

  updateDonor() {
    if (!this.isEditMode) {
      alert('אין פריט לערוך. חפש או בחר פריט קודם.');
      return;
    }

    if (this.donorService.update(this.donor2)) {
      alert('פריט עודכן בהצלחה!');
      this.resetForm();
    } else {
      alert('לא נמצא פריט לעדכון.');
    }
  }

  resetForm() {
    this.donors = {
      id: 0,
      name: '',
      email: '',
      phone: '',
      donor: '' // הוספתי את השדה donor כאן
    };
    this.isEditMode = false;
  }
}
