import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Maid } from '../../maid/interface/miad.interface';
import { ResidentService } from '../service/resident.service';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit{
  validateForm!: FormGroup;
  private router = inject(Router);
  service: ResidentService = new ResidentService;
  changeDetectorRef: ChangeDetectorRef | undefined
  dataMaids: Maid[] = [];
  nodes: NzTreeNodeOptions[] = [];
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      id_user: new FormControl<number | null>(null),
      username: new FormControl<string | null>(null, Validators.required),
      password: new FormControl<string | null>(null, Validators.required),
      fname: new FormControl<string | null>(null),
      lname: new FormControl<string | null>(null),
      phone: new FormControl<string | null>(null),
      roomnumber: new FormControl<string | null>(null,Validators.required),
      roomsize: new FormControl<string | null>(null),
      maid_rating: new FormControl<number | null>(null),
      type_id: new FormControl<number | null>(null, Validators.required),
    });

    const dig = (startPath = '7', maxStartPath = 35, leafCount = 17, maxSubKeyIndex = 486): NzTreeNodeOptions[] => {
      const list = [];
      let subKeyIndex = 1; // ค่าเริ่มต้นของ subKeyIndex
      
      for (let i = parseInt(startPath); i <= maxStartPath; i++) {
        const key = `${i}`;
        const treeNode: NzTreeNodeOptions = {
          title: key,
          key,
          expanded: true,
          children: [],
          isLeaf: false,
        };
    
        for (let j = 0; j < leafCount && subKeyIndex <= maxSubKeyIndex; j++) {
          const subKey = `860/${subKeyIndex}`;
          const subTreeNode: NzTreeNodeOptions = {
            title: subKey,
            key: subKey,
            expanded: true,
            isLeaf: true,
          };
    
          if (treeNode.children) {
            treeNode.children.push(subTreeNode);
          } else {
            treeNode.children = [subTreeNode];
          }
    
          subKeyIndex++; // เพิ่มค่า subKeyIndex ทีละ 1
        }
    
        list.push(treeNode);
      }
      return list;
    };
    
    this.nodes = dig();
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