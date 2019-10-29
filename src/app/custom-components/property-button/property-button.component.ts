import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

/**
 * Property Button component
 * Renders Add/ Remove button  the proprty cards
 * based on the input type
 * Emits event based on the type of button clicked
 */
@Component({
  selector: 'app-custom-property-button',
  templateUrl: './property-button.component.html',
  styleUrls: ['./property-button.component.scss']
})
export class PropertyButtonComponent implements OnInit {
  @Input() id = '';
  @Input() type = '';
  @Output() addClicked = new EventEmitter();
  @Output() removeClicked = new EventEmitter();

  propertyTypeFlag: boolean;

  constructor() { }

  ngOnInit() {
    this.setPropertyFlag();
  }

  clickedAdd() {
    this.addClicked.emit(this.id);
  }

  clickedRemoved() {
    this.removeClicked.emit(this.id);
  }

  setPropertyFlag() {
    this.propertyTypeFlag = (this.type === 'add') ? true : false;
  }
}
