import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Maid } from '../../maid/interface/miad.interface';
import { ResidentService } from '../service/resident.service';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  validateForm!: FormGroup;
  private router = inject(Router);
  service: ResidentService = new ResidentService;
  changeDetectorRef: ChangeDetectorRef | undefined
  dataMaids: Maid[] = [];
  nodes: NzTreeNodeOptions[] = [];
  constructor(private fb: FormBuilder) { }
  roomNumber: number | undefined;
  selectedFloor: number | undefined;
  selectfloorControl = new FormControl();


  floorData: { label: string, value: number, start:number,end:number ,size:string}[] = [
    { label: '7', value: 7 ,start:1, end:14 ,size:"26.5 -29.5 sq m"},
    { label: '8', value: 8 ,start:15, end:28,size:"26.5 -29.5 sq m"},
    { label: '9', value: 9 ,start:29, end:42,size:"26.5 -29.5 sq m"},
    { label: '10', value: 10 ,start:43, end:56,size:"26.5 -29.5 sq m"},
    { label: '11', value: 11, start:57, end:70,size:"26.5 -29.5 sq m"},
    { label: '12', value: 12 ,start:71, end:84,size:"26.5 -29.5 sq m"},
    { label: '13', value: 13 ,start:85, end:98,size:"26.5 -29.5 sq m"},
    { label: '14', value: 14 ,start:99, end:112,size:"26.5 -29.5 sq m"},
    { label: '15', value: 15 ,start:113, end:126,size:"26.5 -29.5 sq m"},
    { label: '16', value: 16 ,start:127, end:140,size:"26.5 -29.5 sq m"},
    { label: '17', value: 17 ,start:141, end:154,size:"26.5 -29.5 sq m"},
    { label: '18', value: 18 ,start:155, end:168,size:"26.5 -29.5 sq m"},
    { label: '19', value: 19 ,start:169, end:182,size:"26.5 -29.5 sq m"},
    { label: '20', value: 20 ,start:183, end:196,size:"26.5 -29.5 sq m"},
    { label: '21', value: 21 ,start:197, end:210,size:"26.5 -29.5 sq m"},
    { label: '22', value: 22 ,start:211, end:224,size:"26.5 -29.5 sq m"},
    { label: '23', value: 23 ,start:225, end:238,size:"26.5 -29.5 sq m"},
    { label: '24', value: 24 ,start:239, end:252,size:"26.5 -29.5 sq m"},
    { label: '25', value: 25 ,start:253, end:266,size:"26.5 -29.5 sq m"},
    { label: '26', value: 26 ,start:267, end:280,size:"26.5 -29.5 sq m"},
    { label: '27', value: 27 ,start:281, end:294,size:"26.5 -29.5 sq m"},
    { label: '28', value: 28 ,start:295, end:308,size:"26.5 -29.5 sq m"},
    { label: '29', value: 29 ,start:309, end:322,size:"26.5 -29.5 sq m"},
    { label: '30', value: 30 ,start:323, end:336,size:"26.5 -29.5 sq m"},
    { label: '31', value: 31 ,start:337, end:350,size:"26.5 -29.5 sq m"},
    { label: '32', value: 32 ,start:351, end:364,size:"26.5 -29.5 sq m"},
    { label: '33', value: 33 ,start:365, end:378,size:"26.5 -29.5 sq m"},
    { label: '34', value: 34 ,start:379, end:393,size:"26.5 -29.5 sq m"},
  ];

  roomData: { label: string, value: string }[] = [];

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      id_user: new FormControl<number | null>(null),
      username: new FormControl<string | null>(null, Validators.required),
      password: new FormControl<string | null>(null, Validators.required),
      profile: new FormControl<Blob | null>(null),
      fname: new FormControl<string | null>(null),
      lname: new FormControl<string | null>(null),
      nickname: new FormControl<string | null>(null),
      phone: new FormControl<string | null>(null),
      selectfloor: this.selectfloorControl,
      id_card: new FormControl<number | null>(null, Validators.required),
      birthday: new FormControl<number | null>(null),
      address: new FormControl<string | null>(null),
      roomnumber: new FormControl<string | null>(null),
      roomsize: new FormControl<string | null>(null),
      maid_rating: new FormControl<number | null>(null),
      type_id: new FormControl<number | null>(null, Validators.required),
    });

  }
 

 onFloorChange(floor: any): void {
  console.log(floor["start"]);
  this.roomData = []
      for (let room = floor["start"]; room <= floor["end"]; room++) {
        const roomNumber = `860/${room}`;
        this.roomData.push({
          label: roomNumber,
          value: roomNumber,
        });
      }
      this.validateForm.get("roomsize")?.patchValue(floor["size"]);
      this.changeDetectorRef?.markForCheck();
}


  submitForm(): void {
    if (this.validateForm.valid) {
      this.service.createUser(this.validateForm.value, '/some-url').subscribe({
        next: (response: any) => {
          const data: any = response;
          this.dataMaids = data;
          this.changeDetectorRef?.detectChanges();
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.log("error", err);
        }
      });
      console.log('submit', this.validateForm.value);
    } else {
      console.log('error mai kao valid', this.validateForm.value);
    }
  }
}