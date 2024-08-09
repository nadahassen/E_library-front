import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { ImageModel } from 'app/models/imagemodel.model';
import { Resource } from 'app/models/resource.model';
import { User } from 'app/models/user.model';
import { ResourceService } from 'app/services/resource.service';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-ressource',
  templateUrl: './ressource.component.html',
  styleUrls: ['./ressource.component.css']
})
export class RessourceComponent implements OnInit {
  resources: Resource[] = [];
  filteredResources: Resource[] = [];
  specialties: string[] = [];
  filteredSpecialties: string[] = [];
  statuses: string[] = [];
  subjects: string[] = [];
  grades: number[] = [];
  isModalOpen: boolean = false;
  currentImage?: ImageModel;
  staticUser: User;

  filters = {
    grade: [] as number[],       // Changed to array
    specialty: [] as string[],   // Changed to array
    status: [] as string[],      // Changed to array
    subject: [] as string[],     // Changed to array
    title: '' as string
  };

  constructor(
    private resourceService: ResourceService,
    private sanitizer: DomSanitizer,
    private httpClient: HttpClient,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadResources();
    this.loadStaticUser();
  }

  loadStaticUser(): void {
    this.userService.getUserById(1).subscribe(user => {
      this.staticUser = user;
    }, error => {
      console.error('Error fetching user', error);
    });
  }

  loadResources() {
    this.resourceService.retrieveAllResources().subscribe(data => {
      this.resources = data;
      this.filteredResources = data;
      this.populateFilters();
      this.applyFilters();
    });
  }

  populateFilters() {
    this.grades = [...new Set(this.resources.map(resource => resource.subject.grade))];
    this.statuses = [...new Set(this.resources.map(resource => resource.status))];
    this.subjects = [...new Set(this.resources.map(resource => resource.subject.name))];
    this.specialties = [...new Set(this.resources.map(resource => resource.subject.spec))];
  }


  applyFilters() {
    const searchText = this.filters.title?.toLowerCase() || '';
    
    // If grades 1, 2, or 3, filter specialties to only include 'TRUNC'
    if (this.filters.grade.length > 0 && [1, 2, 3].some(g => this.filters.grade.includes(g))) {
      this.filteredSpecialties = ['TRUNC'];
    } else {
      this.filteredSpecialties = this.specialties;
    }

    this.filteredResources = this.resources.filter(resource => {
      return (this.filters.grade.length === 0 || this.filters.grade.includes(resource.subject.grade)) &&
             (this.filters.specialty.length === 0 || this.filters.specialty.includes(resource.subject.spec)) &&
             (this.filters.status.length === 0 || this.filters.status.includes(resource.status)) &&
             (this.filters.subject.length === 0 || this.filters.subject.includes(resource.subject.name)) &&
             (searchText === '' || resource.title.toLowerCase().includes(searchText));
    });
  }

  onGradeChange(event: any) {
    const grade = parseInt(event.target.value, 10);
    if (event.target.checked) {
      this.filters.grade.push(grade);
    } else {
      this.filters.grade = this.filters.grade.filter(g => g !== grade);
    }
    this.applyFilters();
  }

  onSpecialtyChange(event: any) {
    const specialty = event.target.value;
    if (event.target.checked) {
      this.filters.specialty.push(specialty);
    } else {
      this.filters.specialty = this.filters.specialty.filter(s => s !== specialty);
    }
    this.applyFilters();
  }

  onStatusChange(event: any) {
    const status = event.target.value;
    if (event.target.checked) {
      this.filters.status.push(status);
    } else {
      this.filters.status = this.filters.status.filter(s => s !== status);
    }
    this.applyFilters();
  }

  onSubjectChange(event: any) {
    const subject = event.target.value;
    if (event.target.checked) {
      this.filters.subject.push(subject);
    } else {
      this.filters.subject = this.filters.subject.filter(s => s !== subject);
    }
    this.applyFilters();
  }

  getImageUrl(imageId: number): string {
    return `http://localhost:9100/library/images/${imageId}`;
  }

  getSafeUrl(imageId: number): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`http://localhost:9100/library/images/${imageId}`);
  }

  viewResource(image: ImageModel) {
    console.log('Selected Resource:', this.resources); // Add this line
    this.currentImage = image;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.currentImage = undefined;
  }

  approveResource(resourceId: number): void {
    const resource = this.resources.find(r => r.id_resource === resourceId);
    if (resource) {
      resource.status = 'APPROVED';
      resource.approve = this.staticUser;
      this.resourceService.modifyResource(resource).subscribe(
        () => {
          this.applyFilters();
          console.log(`Approved resource with ID: ${resourceId}`);
        },
        error => {
          console.error('Error approving resource', error);
        }
      );
    }
  }

  declineResource(resourceId: number): void {
    const resource = this.resources.find(r => r.id_resource === resourceId);
    if (resource) {
      this.resourceService.removeResource(resourceId).subscribe(
        () => {
          this.resources = this.resources.filter(r => r.id_resource !== resourceId);
          this.applyFilters();
          console.log(`Deleted resource with ID: ${resourceId}`);
        },
        error => {
          console.error('Error deleting resource', error);
        }
      );
    }
  }

   downloadFile(url: string, filename: string): void {
    this.httpClient.get(url, { responseType: 'blob' }).subscribe(blob => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    });
  }

  
}
