import { Component, OnInit } from '@angular/core';
import { PortalService } from '../../services/portal.service';
import { UserRetro } from '../../interfaces/responses';

@Component({
  selector: 'app-team',

  templateUrl: './team.component.html',
  styleUrl: './team.component.scss'
})
export class TeamComponent implements OnInit {

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
