import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common'; // Needed for *ngIf
import { SpinnerService } from '../shared/spinner.service';
@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
  standalone: true,        // ✅ mark as standalone
  imports: [CommonModule], // ✅ import CommonModule for *ngIf
})
export class SpinnerComponent implements OnInit {
  constructor(public spinner: SpinnerService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.spinner.loading$.subscribe(() => this.cdr.detectChanges());
  }
}