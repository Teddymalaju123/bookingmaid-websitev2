import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaidService } from '../service/maid.service';


@Component({
  selector: 'app-maid-detail',
  templateUrl: './maid-detail.component.html',
  styleUrls: ['./maid-detail.component.css']
})
export class MaidDetailComponent implements OnInit {
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  private maidService = inject(MaidService);
  data: any[] = []
  id_user: any;
  ngOnInit(): void {
    this._route.queryParams.subscribe(params => {
      this.getWork(params['id_user'])
    });
  }

  getWork(id: any) {
    this.maidService.getMaidById(id).subscribe({
      next: (_response: any) => {
        console.log(_response);

        this.data = _response
      },
      error: (err) => {
        console.log('error', err);
      },
    });
  }

  convertToThaiDateTime(inputDate: string): string {
    const monthsInThai = [
      "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
      "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];

    const date = new Date(inputDate);
    const thaiMonth = monthsInThai[date.getMonth()];
    const thaiYear = date.getFullYear() + 543; // Convert to Buddhist Era (BE) year

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${date.getDate()} ${thaiMonth} ${thaiYear} ${hours}:${minutes}:${seconds}`;
  }

}
