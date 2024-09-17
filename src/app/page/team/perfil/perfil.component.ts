
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PortalService } from '../../../services/portal.service';
import { UserRetro } from '../../../interfaces/responses';
import { ListComponent } from '../../news/list/list.component';

@Component({
  selector: 'app-team',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  username: string = "";

  perfil: UserRetro = {}

  @ViewChild(ListComponent) listTips!: ListComponent;

  constructor(private route: ActivatedRoute,private portalService: PortalService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.username = params.get('username') || "";
      this.username = this.username.split("@")[1]
      this.perfil.alias = this.username 
      this.portalService.checkAlias(this.perfil).subscribe(
        response => {
          this.perfil = response
          this.listTips.loadPosts();
        }
      );

    });
  }
} 
