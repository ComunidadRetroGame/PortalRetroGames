import { Component, OnInit } from '@angular/core';
import { SesionService } from '../../services/sesion.service';
import { LoginResponse } from '../../interfaces/responses';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  userName:string=""

  constructor(private sesionService: SesionService) { }

  ngOnInit(): void {
    this.sesionService.sesionOnline().subscribe(
      response => {
        this.userName = response.User.alias;
      },
      error => {
        this.userName=""
      }
    );
  }



  
}
