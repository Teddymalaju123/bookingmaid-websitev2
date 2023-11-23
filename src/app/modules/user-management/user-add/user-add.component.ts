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
    { label: '7', value: 7 ,start:1, end:17 ,size:"26.5 -29.5 sq m"},
    { label: '8', value: 8 ,start:18, end:34,size:"26.5 -29.5 sq m"},
    { label: '9', value: 9 ,start:35, end:51,size:"26.5 -29.5 sq m"},
    { label: '10', value: 10 ,start:52, end:69,size:"26.5 -29.5 sq m"},
    { label: '11', value: 11, start:70, end:86,size:"26.5 -29.5 sq m"},
    { label: '12', value: 12 ,start:87, end:103,size:"26.5 -29.5 sq m"},
    { label: '13', value: 13 ,start:104, end:120,size:"26.5 -29.5 sq m"},
    { label: '14', value: 14 ,start:121, end:137,size:"26.5 -29.5 sq m"},
    { label: '15', value: 15 ,start:138, end:154,size:"26.5 -29.5 sq m"},
    { label: '16', value: 16 ,start:155, end:171,size:"26.5 -29.5 sq m"},
    { label: '17', value: 17 ,start:172, end:188,size:"34.5 sq m"},
    { label: '18', value: 18 ,start:189, end:205,size:"34.5 sq m"},
    { label: '19', value: 19 ,start:206, end:222,size:"34.5 sq m"},
    { label: '20', value: 20 ,start:223, end:239,size:"34.5 sq m"},
    { label: '21', value: 21 ,start:240, end:256,size:"34.5 sq m"},
    { label: '22', value: 22 ,start:257, end:273,size:"34.5 sq m"},
    { label: '23', value: 23 ,start:274, end:290,size:"34.5 sq m"},
    { label: '24', value: 24 ,start:291, end:307,size:"34.5 sq m"},
    { label: '25', value: 25 ,start:308, end:324,size:"34.5 sq m"},
    { label: '26', value: 26 ,start:325, end:341,size:"34.5 sq m"},
    { label: '27', value: 27 ,start:342, end:358,size:"34.5 sq m"},
    { label: '28', value: 28 ,start:359, end:375,size:"49.5 -50.25 sq m"},
    { label: '29', value: 29 ,start:376, end:392,size:"49.5 -50.25 sq m"},
    { label: '30', value: 30 ,start:393, end:409,size:"49.5 -50.25 sq m"},
    { label: '31', value: 31 ,start:410, end:426,size:"49.5 -50.25 sq m"},
    { label: '32', value: 32 ,start:427, end:443,size:"49.5 -50.25 sq m"},
    { label: '33', value: 33 ,start:444, end:460,size:"49.5 -50.25 sq m"},
    { label: '34', value: 34 ,start:461, end:477,size:"49.5 -50.25 sq m"},
    { label: '35', value: 35 ,start:478, end:487,size:"49.5 -50.25 sq m"},
  ];

  roomData: { label: string, value: string }[] = [];

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      id_user: new FormControl<number | null>(null),
      username: new FormControl<string | null>(null, Validators.required),
      password: new FormControl<string | null>(null, Validators.required),
      profile: new FormControl<Blob | null>(null, Validators.required),
      fname: new FormControl<string | null>(null, Validators.required),
      lname: new FormControl<string | null>(null, Validators.required),
      nickname: new FormControl<string | null>(null, Validators.required),
      phone: new FormControl<string | null>(null, Validators.required),
      selectfloor: this.selectfloorControl,
      id_card: new FormControl<number | null>(null, Validators.required),
      birthday: new FormControl<Date | null>(null, Validators.required),
      address: new FormControl<string | null>(null, Validators.required),
      roomnumber: new FormControl<string | null>(null, Validators.required),
      roomsize: new FormControl<string | null>(null, Validators.required),
      maid_rating: new FormControl<number | null>(null, Validators.required),
      type_id: new FormControl<number | null>(2),
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