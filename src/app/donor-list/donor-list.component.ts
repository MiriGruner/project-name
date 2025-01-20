import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Donors } from '../models/donor.model';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { DonorServiceService } from '../Service/donor-service.service';
import { AddDonorComponent } from '../add-donor/add-donor.component';
import { UpdateDonorComponent } from '../update-donor/update-donor.component';

@Component({
  selector: 'app-donor-list',
  standalone: true,
  imports: [CommonModule, AddDonorComponent,  UpdateDonorComponent],
  templateUrl: './donor-list.component.html',
  styleUrls: ['./donor-list.component.css']
})
export class DonorListComponent {
  donors: Donors[] = [];

  constructor(private donorService: DonorServiceService) {}

  ngOnInit(): void {
    this.donorService.getAll().subscribe((donorsData: Donors[]) => {
      this.donors = donorsData;
      console.log(this.donors);
    });
  }
}
