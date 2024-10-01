import { Component, OnInit } from '@angular/core';
import { PortalService } from '../../services/portal.service';
import { UserRetro } from '../../interfaces/responses';


@Component({
  selector: 'app-team-mobile',
  templateUrl: './team-mobile.component.html',
  styleUrl: './team-mobile.component.scss'
})
export class TeamMobileComponent implements OnInit {
  teams: UserRetro[] = []

  constructor(private portalService: PortalService) { }

  ngOnInit(): void {
    this.portalService.getTeam().subscribe(
      response => {

        response.forEach(player => {

          this.teams.push(player)

        })
      }
    );
  }
}