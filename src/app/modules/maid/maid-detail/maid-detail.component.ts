import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaidService } from '../service/maid.service';
import { Maid } from '../interface/miad.interface';


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
  mode: string = 'date'; 
  searchValue = '';
  visible = false;


  ngOnInit(): void {
    this._route.queryParams.subscribe(params => {
      const idUser = params['id_user'];
      if (idUser) {
        this.id_user = idUser;
        console.log(this.id_user);
      }
    });
    this._route.queryParams.subscribe(_response => {
      this.getWork();
      this.reset();
    });
  }

  getWork() {
    this.maidService.getMaidById(this.id_user).subscribe({
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

  convertToThaiDate(inputDate: string): string {
    const monthsInThai = [
      "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
      "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];
  
    const date = new Date(inputDate);
    const thaiMonth = monthsInThai[date.getMonth()];
    const thaiYear = date.getFullYear() + 543;
  
    return ` ${date.getDate()} ${thaiMonth} ${thaiYear}`;
  }
  
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.data = this.data.filter((item: any) => item.fname.indexOf(this.searchValue) !== -1);
  }


  deleteMaidTime(id_worktime: number): void {
    this.maidService.deleteMaidTime(id_worktime).subscribe(
      () => {
        this.getWork();
        console.log('ลบข้อมูลสำเร็จ')
      },
      (error) => {
        console.error('เกิดข้อผิดพลาดในการลบตารางการทำงานแม่บ้าน:', error);
      }
    );
  }

  editmaid(id: any) {
    this._router.navigate(['/maid/edit-maid'], {
      queryParams: {
        id_worktime : id
      }
    });
  }

  Back(){
    this._router.navigate(['/maid/maid-list']);
  }
}
