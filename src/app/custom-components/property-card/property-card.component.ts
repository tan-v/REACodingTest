import { Component, OnInit, Input } from '@angular/core';
import { Property } from '../../property-list/property';
import { PropertyDetailsService } from '../../services/property-details.service';

/**
 * Property Card component
 * Renders proprty card from the value passed from PRoperty List component
 * Uses custom component: app-custom-property-button to render
 * Add Remove property button on each card
 */
@Component({
  selector: 'app-custom-property-card',
  templateUrl: './property-card.component.html',
  styles: ['.card-header { backbround-color: bgColor}']
})
export class PropertyCardComponent implements OnInit {
  message: string;
  @Input() propertyObj: Property;
  @Input() propCategory: string;

  constructor(private propertyDetailsService: PropertyDetailsService) {}

  ngOnInit() {}

  updateProperty(obj: any) {
    switch (obj.type) {
      case 'add':
        this.message = this.propertyDetailsService.addSavedProperty(obj.id);
        break;
      case 'remove':
        this.propertyDetailsService.removeSavedProperty(obj.id);
        break;
      case 'hide':
        this.propertyDetailsService.hideResultsProperty(obj.id);
        break;
      case 'unhide':
        this.propertyDetailsService.unhideResultsProperty(obj.id);
    }
  }
}
