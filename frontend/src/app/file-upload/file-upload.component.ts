import { Component } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';  // 导入 HttpClient 和 HttpEventType

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  standalone: true,  // 确保 standalone 属性设置为 true
})
export class FileUploadComponent {
  selectedFile: File | null = null;
  uploadProgress: number = 0;
  uploadMessage: string = '';

  constructor(private http: HttpClient) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      this.http.post('https://your-backend-url/api/upload', formData, {
        reportProgress: true,
        observe: 'events'
      }).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded ?? 0) / (event.total ?? 1));  // 处理 loaded 和 total 可能为 undefined 的情况
        } else if (event.type === HttpEventType.Response) {
          this.uploadMessage = 'Upload successful!';
        }
      }, error => {
        this.uploadMessage = 'Upload failed!';
        console.error('Upload error:', error);
      });
    }
  }
}
