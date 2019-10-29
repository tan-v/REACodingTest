import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Property } from '../property-list/property';

/**
 * Service for fetching, adding, removing property object
 * from results and saved arrays
 */

@Injectable({
  providedIn: 'root'
})
export class PropertyDetailsService {

  url = './assets/mockJSON/data.json';

  /**
   * Behaviour Subject for Results array that can be returned as observable
   */
  private resultsPropertiesSubject = new BehaviorSubject<Property[]>(null);
  private resultsProperties = this.resultsPropertiesSubject.asObservable();
  private resultsArray: Property[];

  /**
   * Behaviour Subject for Saved array that can be returned as observable
   */
  private savedPropertiesSubject = new BehaviorSubject<Property[]>(null);
  private savedProperties = this.savedPropertiesSubject.asObservable();
  private savedArray: Property[];

  constructor(private http: HttpClient) {
    this.setPropertyDetails();
  }

  /*
  * Update the Results Observable with results array
  * @param {data: Property[]} The <property> array of results
  * @returns
  */
  setResultsObservable(data: Property[]) {
    this.resultsPropertiesSubject.next(data);
  }

  /*
  * Update the Saved Observable with saved array
  * @param {Property[]} The <property> array of saved properties
  * @returns
  */
  setSavedObservable(data: Property[]) {
    this.savedPropertiesSubject.next(null);
    this.savedPropertiesSubject.next(data);
  }

  /*
  * HTTP Client GET Request to fetch data from Mock backend
  * @param {}
  * @returns json payload from Mock backend as Observable
  */
  getPropertyDetailsFromBackend(): Observable<any> {
    return this.http.get(this.url);
  }

  /*
  * Calls the method to GET data from Mock backend and updates the results and saved observables
  * @param {}
  * @returns
  */
  setPropertyDetails(): void {
    console.log('Calling mock HTTP service to get data.');
    this.getPropertyDetailsFromBackend().subscribe(
      (data: any) => {
        this.setResultsObservable(data.results);
        this.setSavedObservable(data.saved);
        this.resultsArray = data.results;
        this.savedArray = data.saved;
      },
      error => {
        console.log(error);
      }
    );
  }

  /*
  * To get the Results Property array
  * @param {}
  * @returns returns the results array as observable
  */
  getResultsProperty(): Observable<Property[]> {
    return this.resultsProperties;
  }

  /*
* To get the Saved Property array
* @param {}
* @returns returns the saved array as observable
*/
  getSavedProperty(): Observable<Property[]> {
    return this.savedProperties;
  }

  /*
  * Adds new property to saved properties array if the id is valid
  * @param {string} id The id of the property to be added in saved array
  * @returns returns the message after the add operation
  */
  addSavedProperty(id: string): string {
    let message = '';
    if (!id) {
      console.log('Error: Unable to update Saved Properties. Null Property object.');
      message = 'Error: Unable to update Saved Properties. Null Property object.';
    } else {
      const obj = this.resultsArray.find((val, index, arr) => val.id === id);
      if (obj) {
        if (this.getPropertyIndexById(id, this.savedArray) > -1) {
          message = 'Property already added in Saved Properties';
          console.log(message);
        } else {
          this.savedArray.push(obj);
          this.setSavedObservable(this.savedArray);
          console.log(`Added property id: ${id} to saved properties.`);
        }
      } else {
        message = 'Object is not present in Results Array. Cannot add to saved properties.';
      }
    }
    return message;
  }

  /*
  * Removes new property from saved array if id is present in the array
  * @param {string} id The id of the property to be removed from saved array
  * @returns returns the message after the remove operation
  */
  removeSavedProperty(id: string): string {
    let message = '';
    if (id && this.savedArray && (this.getPropertyIndexById(id, this.savedArray) > -1)) {
      this.savedArray = this.savedArray.filter(obj => {
        return (obj.id !== id);
      });
      this.setSavedObservable(this.savedArray);
      message = `Removed property id: ${id} from saved properties.`;
      console.log(message);

    } else {
      message = 'Error: Unable to update Saved Properties. Property id is invalid.';
      console.log(message);
    }
    return message;
  }

  /*
  * Utility method that returns the index of the object based on id used for search
  * @param {string} id The id of the property object to be searched
  * @param {Property[]} propArray The array to be searched
  * @returns returns the index of the object having that id
  */
  getPropertyIndexById(id: string, propArray: Property[]): number {
    if (propArray && propArray.length) {
      const index = propArray.findIndex(obj => obj.id === id);
      return index;
    } else {
      return -1;
    }
  }
}
