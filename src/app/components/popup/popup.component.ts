import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {
  @Input() visible = false;
  @Output() dataEmitter = new EventEmitter<any>();
  close() {
    this.visible = false;
    this.dataEmitter.emit(this.visible);
  }
}
