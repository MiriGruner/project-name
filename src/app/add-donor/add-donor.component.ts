import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service'; 
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Items } from '../models/Items.model';
import { DonorServiceService } from '../Service/donor-service.service';
import { Donors } from '../models/donor.model';

@Component({
  selector: 'app-add-donor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-donor.component.html',
  styleUrl: './add-donor.component.css'
})
export class AddDonorComponent {
  // donors: Donors = {
  //   id: 0,
  //   name: '',
  //   email: '',
  //   phon: '',
  // };



isEditMode: boolean = false;

constructor(private DonorServiceService: DonorServiceService) {}

addDonor() {
  if (this.isEditMode) {
    alert('כבר במצב עריכה, עדכן פריט במקום להוסיף.');
    return;
  }

  // if (this.DonorServiceService.add(this.donors)) {
  //   alert('פריט נוסף בהצלחה!');
  //   this.resetForm();
  // } else {
  //   alert('שם המתנה כבר קיים במערכת.');
  // }
}
resetForm() {
//   this.donors = {
//     id: 0,
//     name: '',
//     email: '',
//     phone: '',
//   };
//   this.isEditMode = false;
// }
}}
