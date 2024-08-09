import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrls: ['./usernav.component.css']
})
export class UsernavComponent implements OnInit {
  constructor(private router:Router) { }
  navigate(route: string) {
    this.router.navigate([`/etudiant/${route}`]);
    this.closeMenu();
  }
  ngOnInit(): void {
  }
  closeMenu() {
    const checkbox = document.getElementById('menu-icon') as HTMLInputElement;
    checkbox.checked = false;
  }
}
