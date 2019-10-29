import { async, ComponentFixture, TestBed  } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PropertyButtonComponent } from './property-button.component';
import { DebugElement } from '@angular/core';

describe('PropertyButtonComponent', () => {
  let component: PropertyButtonComponent;
  let fixture: ComponentFixture<PropertyButtonComponent>;
  let de: DebugElement;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PropertyButtonComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyButtonComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the property flag to true if input type="add" and false if type="remove"', () => {
    component.type = 'add';
    component.setPropertyFlag();
    expect(component.propertyTypeFlag).toBeTruthy();

    component.type = 'remove';
    component.setPropertyFlag();
    fixture.detectChanges();
    expect(component.propertyTypeFlag).toBeFalsy();
  });

  it('should have a button with name `Add Property` if propertyTypeFlag is true', () => {
    component.propertyTypeFlag = true;
    fixture.detectChanges();
    expect(de.query(By.css('button')).nativeElement.innerText).toBe('Add Property');
  });

  it('should have a button with name `Remove Property` if propertyTypeFlag is false', () => {
    component.propertyTypeFlag = false;
    fixture.detectChanges();
    expect(de.query(By.css('button')).nativeElement.innerText).toBe('Remove Property');
  });

  it('should emit `addClicked` event on button `Add Property` button click', () => {
    component.id = '1';
    component.type = 'add';
    component.setPropertyFlag();
    fixture.detectChanges();
    let idSelected: string;
    component.addClicked.subscribe(
      (id: string) => {
      idSelected = id;
    });
    de.query(By.css('button')).triggerEventHandler('click', component.id);
    expect(idSelected).toBe(component.id);
  });

  it('should emit `removeClicked` event on button `Remove Property` button click', () => {
    component.id = '1';
    component.type = 'remove';
    component.setPropertyFlag();
    fixture.detectChanges();
    let idSelected: string;
    component.removeClicked.subscribe(
      (id: string) => {
      idSelected = id;
    });
    de.query(By.css('button')).triggerEventHandler('click', component.id);
    expect(idSelected).toBe(component.id);
  });

});
