import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
selector: 'app-header',
 standalone: true, 
  imports: [RouterLink, CommonModule, RouterModule],
   templateUrl: './header.html',
    styleUrl: './header.css'
})
export class Header {
   
    

}