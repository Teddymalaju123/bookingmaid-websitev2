import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaidService } from '../service/maid.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';


@Component({
  selector: 'app-maid-detail',
  templateUrl: './maid-detail.component.html',
  styleUrls: ['./maid-detail.component.css']
})
export class MaidDetailComponent implements OnInit {
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  private maidService = inject(MaidService);
  private _changeDetectorRef = inject(ChangeDetectorRef);
  data: any[] = []
  id_user: any;
  ngOnInit(): void {
    this._route.queryParams.subscribe(_response => {
      this.getWork()
    });
  }

  getWork() {
    this.maidService.getMaidById().subscribe({
      next: (_response: any) => {
        console.log(_response);
        this.data = _response
        this._changeDetectorRef.detectChanges()
      },
      error: (err) => {
        console.log('error', err);
      },
    });
  }


  convertToThaiDayOfWeek(inputDate: string): string {
    const daysInThai = [
      "วันอาทิตย์", "วันจันทร์", "วันอังคาร", "วันพุธ", "วันพฤหัสบดี", "วันศุกร์", "วันเสาร์"
    ];
    const date = new Date(inputDate);
    const thaiDayOfWeek = daysInThai[date.getDay()];
    return thaiDayOfWeek;
}

  deleteMaidTime(id_worktime: number): void {
    this.maidService.deleteMaidTime(id_worktime).subscribe(
      () => {
        console.log('ลบข้อมูลสำเร็จ')
      },
      (error) => {
        console.error('เกิดข้อผิดพลาดในการลบตารางการทำงานแม่บ้าน:', error);
      }
    );
  }

  Back(){
    this._router.navigate(['/maid/maid-list']);
  }
}
