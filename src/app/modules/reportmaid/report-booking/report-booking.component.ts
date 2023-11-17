import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ReportProblemService } from '../service/reportproblem.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-report-booking',
  templateUrl: './report-booking.component.html',
  styleUrls: ['./report-booking.component.css']
})
export class ReportBookingComponent implements OnInit {
  private service = inject(ReportProblemService);
  private _changeDetectorRef = inject(ChangeDetectorRef);
  private _activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  feedbacks: any[] = [];
  selectedBookid: number | null = null;

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe(params => {
      const idBook = params['id_booking'];
      if (idBook) {
        this.selectedBookid = idBook;
        console.log(this.selectedBookid);
      }
    });
    this.getBooking()
  }

  getBooking(): void {
    this.service.getBooking(this.selectedBookid!).subscribe({
      next: (response: any) => {
        const data: any = response;
        this.feedbacks = data
        this._changeDetectorRef.detectChanges()
      },
      error: (err) => {
      }
    });
  }

  updateStatus(feedback_id: number): void {
    const requestBody = {
      feedback_id: feedback_id,
      status_feedback: 8,
    };
    console.log(feedback_id)
    this.service.updateStatus(requestBody).subscribe({
      next: (_response: any) => {
        this._changeDetectorRef?.detectChanges();
        this.router.navigate(['/report/reportproblem']);
      },
      error: (err) => {
        console.error('Error', err);
      },
    });
  }
  
  convertImage(image:string) {
    return "data:image/jpeg;base64," + image
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
