import { Component, OnInit } from '@angular/core';
import { PropertyDetailsService  } from '../services/property-details.service';
import { Property } from '../property-list/property';

/**
 * Property List component
 * Renders cards for Results and Saved array
 * Uses custom component: app-custom-property-card to render each property card
 */
@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit {

  resultsPropArray: Array<Property>;
  savedPropArray: Array<Property>;

  constructor(private propertyDetailsService: PropertyDetailsService) {}

  ngOnInit() {
    this.propertyDetailsService.getResultsProperty().subscribe(
     data => {
      this.resultsPropArray = data;
    });
    this.propertyDetailsService.getSavedProperty().subscribe(
      data => {
        this.savedPropArray = data;
      }
    );
  }

}
