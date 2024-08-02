import { Component, OnInit } from '@angular/core';
import { Resource } from 'app/models/resource.model';
import { ResourceService } from 'app/services/resource.service';

@Component({
  selector: 'app-ressource',
  templateUrl: './ressource.component.html',
  styleUrls: ['./ressource.component.css']
})
export class RessourceComponent implements OnInit {
resources : Resource[] = [];
  constructor(private resourceservice : ResourceService) { }

  ngOnInit(): void {
    this.loadRessource();
  }

loadRessource(){
  this.resourceservice.retrieveAllResources().subscribe(data => {
    this.resources = data;
  });

}




}
