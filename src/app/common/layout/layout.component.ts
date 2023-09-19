import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})

export class LayoutComponent implements OnInit {
  imageUrl = './assets/images/logo/ThePrivacy.png';
  constructor(
    private router: Router,

  ) {

  }


  ngOnInit() {
    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(".dataTables_scrollHeadInner").css({ "width": "100%" });
        $(".table ").css({ "width": "100%" });
      });
    });
  }

  ngAfterViewInit(): void {

  }

  otherClick() {
    $(document).ready(function () {
      $('#sidebar').addClass('active');
      $(".dataTables_scrollHeadInner").css({ "width": "100%" });
      $(".table ").css({ "width": "100%" });
    });
  }

  scrollToTop() {
    window.scroll(0, 0);
  }

  toTop() {

  }

}
