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
    this.service.deleteUser(id_user).subscribe(
      (response) => {
        console.log('ลบข้อมูลสำเร็จ')
      },
      (error) => {
        console.error('เกิดข้อผิดพลาดในการลบตารางการทำงานแม่บ้าน:', error);
      }
    );
  }

}
