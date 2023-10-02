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
  mode: string = 'date'; // ตัวแปรสำหรับเก็บโหมดที่ผู้ใช้เลือก
  selectedDate: Date | null = null;
  filteredData: Maid[] = [];


  ngOnInit(): void {
    this._route.queryParams.subscribe(_response => {
      this.getWork()
      this.filterDataByDate();
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
  
  filterDataByDate() {
    if (this.selectedDate) {
      const selectedDate = new Date(this.selectedDate);
  
      // กรองข้อมูลตามวันที่ที่เลือก
      this.filteredData = this.data.filter(item => {
        const itemDate = new Date(item.day);
        return (
          itemDate.getFullYear() === selectedDate.getFullYear() &&
          itemDate.getMonth() === selectedDate.getMonth() &&
          itemDate.getDate() === selectedDate.getDate()
        );
      });
    } else {
      // ถ้าไม่มีวันที่ที่เลือกให้แสดงข้อมูลทั้งหมด
      this.filteredData = this.data;
    }
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
