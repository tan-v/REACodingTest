import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyCardComponent } from './property-card.component';
import { PropertyDetailsService } from '../../services/property-details.service';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PropertyCardComponent', () => {
  let component: PropertyCardComponent;
  let fixture: ComponentFixture<PropertyCardComponent>;
  let de: DebugElement;
  let propertyDetailsService: PropertyDetailsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PropertyCardComponent
      ],
      imports: [HttpClientTestingModule],
      providers: [
        PropertyDetailsService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyCardComponent);
    component = fixture.componentInstance;
    propertyDetailsService = fixture.debugElement.injector.get(PropertyDetailsService);
    component.propertyObj = {
      "price": "$560,520",
      "agency": {
        "brandingColors": {
          "primary": "#fcfa3b"
        },
        "logo": "https://i4.au.reastatic.net/170x32/a3bd69c1a5c651eca02dd829fdd4d11d1a0b3bb6b00db79410817d17067bd495/main.gif"
      },
      "id": "2",
      "mainImage": "https://i1.au.reastatic.net/640x480/88586227f9176f602d5c19cf06261108dbb29f03e30d1c4ce9fc2b51fb1e4bd6/main.jpg"
    };
    component.propCategory = 'add';
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service method addSavedProperty() when event:`addClicked` is emitted', () => {
    const propSpy = spyOn(propertyDetailsService, 'addSavedProperty').and.callThrough();
    const compSpy = spyOn(component, 'addPropertyToSaved').and.callThrough();
    const nativeElement = fixture.nativeElement;
    const ele = nativeElement.querySelector('app-custom-property-button');
    ele.dispatchEvent(new Event('addClicked'));
    fixture.detectChanges();

    expect(compSpy).toHaveBeenCalled();
    expect(propSpy).toHaveBeenCalled();

  });

  it('should call service method removeSavedProperty() method when event:`removeClicked` is emitted', () => {
    const propSpy = spyOn(propertyDetailsService, 'removeSavedProperty').and.callThrough();
    const compSpy = spyOn(component, 'removePropoertyFromSaved').and.callThrough();
    const nativeElement = fixture.nativeElement;
    const ele = nativeElement.querySelector('app-custom-property-button');
    ele.dispatchEvent(new Event('removeClicked'));
    fixture.detectChanges();

    expect(compSpy).toHaveBeenCalled();
    expect(propSpy).toHaveBeenCalled();

  });

});

