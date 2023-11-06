import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResidentService } from '../../user-management/service/resident.service';
import { MaidService } from '../service/maid.service';

@Component({
  selector: 'app-maid-booking',
  templateUrl: './maid-booking.component.html',
  styleUrls: ['./maid-booking.component.css']
})
export class MaidBookingComponent implements OnInit {

  private _activatedRoute = inject(ActivatedRoute);
  id_user: number | null = null;
  private service = inject(MaidService);
  dataResident: any[] = [];

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe(params => {
      const idUser = params['id_user'];
      if (idUser) {
        this.id_user = idUser;
        console.log(this.id_user);
        this.getMaidBook();
      }
    });
  }

  getMaidBook(): void {
    this.service.getBookMaid(this.id_user!).subscribe({
      next: (response: any) => {
        const data: any = response;
        this.dataResident = data;
        console.log(data);
      },
      error: (err) => {
        console.error('Error', err);
      },
    });
  }

  convertToThaiDate(inputDate: Date): string {
    const monthsInThai = [
      "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
      "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];

    const date = new Date(inputDate);
    const thaiMonth = monthsInThai[date.getMonth()];
    const thaiYear = date.getFullYear() + 543;

    return ` ${date.getDate()} ${thaiMonth} ${thaiYear}`;
  }

}
