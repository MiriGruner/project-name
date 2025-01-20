// import { HttpClient } from '@angular/common/http';
// import { Component ,Input} from '@angular/core';
// import {DonorServiceService} from '../Service/donor-service.service'
// import { ApiService } from '../services/api.service';
// @Component({
//   selector: 'app-delete-donor',
//   standalone: true,
//   imports: [],
//   templateUrl: './delete-donor.component.html',
//   styleUrl: './delete-donor.component.css'
// })
// export class DeleteDonorComponent {
//   @Input() donorName: string = '';
//   isEditMode: boolean = false;

//   constructor(private DonorServiceService: DonorServiceService) {}

//   deleteDonor() {
//     if (this.DonorServiceService.delete(this.donorName)) {
//       alert('פריט נמחק בהצלחה!');
//       // this.resetForm();
//     } else {
//       alert('לא נמצא פריט למחיקה.');
//     }
//   }
// }
