import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resource } from 'app/models/resource.model'; // Adjust the import path as needed

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private apiUrl = 'http://localhost:9100/resource'; // Your API URL

  constructor(private http: HttpClient) {}

  // Create a new resource with images
  createResource(resource: Resource, imageFiles: File[], userId: number): Observable<Resource> {
    const formData = new FormData();
    formData.append('resource', JSON.stringify(resource));
    formData.append('userId', userId.toString());

    imageFiles.forEach((file, index) => {
      formData.append('imageFile', file, file.name);
    });

    return this.http.post<Resource>(`${this.apiUrl}/add`, formData);
  }

  // Retrieve all resources
  getAllResources(): Observable<Resource[]> {
    return this.http.get<Resource[]>(`${this.apiUrl}/getall`);
  }

  // Get a resource by ID
  getResourceById(id: number): Observable<Resource> {
    return this.http.get<Resource>(`${this.apiUrl}/getresource/${id}`);
  }

  // Update an existing resource
  updateResource(resource: Resource): Observable<Resource> {
    return this.http.put<Resource>(`${this.apiUrl}/modify`, resource);
  }

  // Delete a resource by ID
  deleteResource(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
