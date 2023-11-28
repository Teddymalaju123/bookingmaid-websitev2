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
  startDate: Date | null = null;
  endDate: Date | null = null;
  date = null;
  originalData: any[] = [];
  workfilter: any[] = [];
  

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
        this.filterData();
      },
      error: (err) => {
        console.log('error', err);
      },
    });
  }

  onChange(result: Date[]): void {
    console.log('onChange: ', result);
    this.startDate = result[0];
    this.endDate = result[1];
    this.filterData();
  }

  reset() {
    this.searchValue = '';
    this.startDate = null;
    this.endDate = null;
    this.filterData();
  }

  search() {
    this.filterData();
  }

  filterData() {
    // Filter data based on the selected date range and search value
    this.workfilter = this.data.filter((item) =>
      (!this.startDate || new Date(item.day) >= this.startDate) &&
      (!this.endDate || new Date(item.day) <= this.endDate) &&
      (!this.searchValue || item.day.includes(this.searchValue))
    );
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

  deleteMaidTime(id_worktime: number): void {
    const deleteConfirmed = window.confirm('คุณต้องการลบลูกบ้านคนนี้ใช่หรือไม่?');


    if (deleteConfirmed) {
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
