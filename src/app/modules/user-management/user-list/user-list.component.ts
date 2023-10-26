import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Maid } from '../../maid/interface/miad.interface';
import { ResidentService } from '../service/resident.service';



@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  private service = inject(ResidentService);
  private _changeDetectorRef = inject(ChangeDetectorRef);
  private router = inject(Router);
  dataResident: Maid[] = [];
  isVisible = false;
  ngOnInit(): void {
    this.getResident()
  }

  getResident(): void {
    this.service.getResident().subscribe({
      next: (response: any) => {
        const data: any = response;
        this.dataResident = data
        this._changeDetectorRef.detectChanges()
      },
      error: (err) => {
      }
    });
  }
  
  add() {
    this.router.navigate(['/user/user-add']);
  }

  goedit(id: any){
    this.router.navigate(['/user/user-edit'], {
      queryParams: {
        id_user : id
      }
    });
  }

  deleteUser(id_user: number): void {
    const deleteConfirmed = window.confirm('คุณต้องการลบลูกบ้านคนนี้ใช่หรือไม่?');

    if (deleteConfirmed) {
    this.service.deleteUser(id_user).subscribe(
      (response) => {
        this.getResident();
        console.log('ลบข้อมูลสำเร็จ');
      },
      (error) => {
        console.error('เกิดข้อผิดพลาดในการลบตารางการทำงานแม่บ้าน:', error);
      }
    );
  }
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
