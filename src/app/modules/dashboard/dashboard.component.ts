import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
imgprivacy1 = "./assets/images/condo-pic-1.png";
imgprivacy2 = "./assets/images/condo-pic-2.png";
imgprivacy3 = "./assets/images/condo-pic-3.jpg";

ngOnInit(): void {
  this.startCarouselAutoSlide();

     }
    startCarouselAutoSlide() {
      setInterval(() => {
        $('#myCarousel').carousel('next');
      }, 3000); // Change image every 3 seconds
    }
    
}


