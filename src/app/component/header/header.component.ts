import { Component, Injectable,OnInit } from '@angular/core';
import { SesionService } from '../../services/sesion.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  online:boolean=false

  constructor(private sesionService: SesionService) { }

  ngOnInit(): void {
    this.sesionService.sesionOnline().subscribe(
      response => {
        this.online = response.User.online;
      },
      error => {
        this.online=false
      }
    );
  }
}
