import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadComponent } from './file-upload/file-upload.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [HttpClientModule, FileUploadComponent],  // 导入 HttpClientModule 和 FileUploadComponent
})
export class AppComponent {
  title = '你的应用标题';
}
