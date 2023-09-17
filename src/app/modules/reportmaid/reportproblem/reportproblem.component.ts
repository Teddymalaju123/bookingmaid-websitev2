import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Maid } from '../../maid/interface/miad.interface';
import { Feedback } from '../interface/reportmaid.interface';
import { ReportProblemService } from '../service/reportproblem.service';

interface Person {
  key: string;
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-reportproblem',
  templateUrl: './reportproblem.component.html',
  styleUrls: ['./reportproblem.component.css']
})
export class ReportproblemComponent implements OnInit {
  private service = inject(ReportProblemService);
  private _changeDetectorRef = inject(ChangeDetectorRef);
  feedbacks: Feedback[] = [];
  ngOnInit(): void {
    this.getReportProblem()
  }

  getReportProblem(): void {
    this.service.getReportProblem().subscribe({
      next: (response: any) => {
        const data: any = response;
        this.feedbacks = data
        this._changeDetectorRef.detectChanges()
      },
      error: (err) => {
      }
    });
  }

}
