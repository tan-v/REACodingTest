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
  @Input() hidden = false;
  @Output() clickedButton = new EventEmitter();

  propertyTypeFlag: boolean;

  constructor() { }

  ngOnInit() {
    this.setPropertyFlag();
  }

  clicked(buttonType: string) {
    this.clickedButton.emit({id: this.id, type: buttonType});
  }

  setPropertyFlag() {
    this.propertyTypeFlag = (this.type === 'add') ? true : false;
  }
}
