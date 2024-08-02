import { Component, OnInit } from '@angular/core';
import { ResourceService } from 'app/services/resource.service'; // Adjust the path as needed
import { Resource } from 'app/models/resource.model'; // Adjust the path as needed

@Component({
  selector: 'app-ressource',
  templateUrl: './ressource.component.html',
  styleUrls: ['./ressource.component.css']
})
export class RessourceComponent implements OnInit {
  resources: Resource[] = []; // Array to hold the resources

  constructor(private resourceService: ResourceService) { }

  ngOnInit(): void {
    this.loadResources();
  }

  loadResources(): void {
    this.resourceService.getAllResources().subscribe(
      (data: Resource[]) => {
        this.resources = data;
      },
      error => {
        console.error('Error fetching resources:', error);
      }
    );
  }
}
