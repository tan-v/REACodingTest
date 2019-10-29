import { TestBed } from '@angular/core/testing';
import { PropertyDetailsService } from './property-details.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('PropertyDetailsService', () => {
  // let httpClientSpy: { get: jasmine.Spy };
  let service: PropertyDetailsService;
  let httpMock: HttpTestingController;
  let req: any;

  let expectedPayload = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PropertyDetailsService]
    });

    expectedPayload = {
      "results": [
        {
          "price": "$726,500",
          "agency": {
            "brandingColors": {
              "primary": "#ffe512"
            },
            "logo": "https://i1.au.reastatic.net/170x32/d9e65c666e427e655fb63dcfe73f50d4ac7ff9a58c173db9474bd92e75b01070/main.gif"
          },
          "id": "1",
          "mainImage": "https://i2.au.reastatic.net/640x480/20bfc8668a30e8cabf045a1cd54814a9042fc715a8be683ba196898333d68cec/main.jpg"
        },
        {
          "price": "$560,520",
          "agency": {
            "brandingColors": {
              "primary": "#fcfa3b"
            },
            "logo": "https://i4.au.reastatic.net/170x32/a3bd69c1a5c651eca02dd829fdd4d11d1a0b3bb6b00db79410817d17067bd495/main.gif"
          },
          "id": "2",
          "mainImage": "https://i1.au.reastatic.net/640x480/88586227f9176f602d5c19cf06261108dbb29f03e30d1c4ce9fc2b51fb1e4bd6/main.jpg"
        },
        {
          "price": "$826,500",
          "agency": {
            "brandingColors": {
              "primary": "#57B5E0"
            },
            "logo": "https://i1.au.reastatic.net/170x32/b269b079bf554d2ae9ca01d578bb3d80ec5fbb4f57062bbfcd51bbf1f2d13981/main.gif"
          },
          "id": "3",
          "mainImage": "https://i4.au.reastatic.net/640x480/98cee1b2a3a64329921fc38f7e2926a78d41fcc683fc48fb8a8ef2999b14c027/main.jpg"
        }
      ],
      "saved": [
        {
          "price": "$526,500",
          "agency": {
            "brandingColors": {
              "primary": "#000000"
            },
            "logo": "https://i2.au.reastatic.net/170x32/3015ba9710c7e3ddc2ac30f45fd7906df5b04e442a7f6948f75a6029b8b871e2/main.gif"
          },
          "id": "4",
          "mainImage": "https://i2.au.reastatic.net/640x480/5e84d96722dda3ea2a084d6935677f64872d1d760562d530c3cabfcb7bcda9c2/main.jpg"
        }
      ]
    };
    service = TestBed.get(PropertyDetailsService);
    httpMock = TestBed.get(HttpTestingController);
    req = httpMock.expectOne(`${service.url}`);
    req.flush(expectedPayload);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call http get and return expected json payload', () => {
    expect(req.request.method).toMatch('GET');
    service.getPropertyDetailsFromBackend().subscribe(
      data => {
        expect(data).toEqual(expectedPayload);
      },
      fail
    );
  });

  describe('PropertyDetailsService: addSavedProperty(id: string)', () => {
    it('should add property to saved properties array if valid id is passed', () => {
      const id = '1';
      expect(service.addSavedProperty(id)).toBe('');
    });

    it('should not add property to saved properties array if invalid id is passed', () => {
      const id = '8';
      expect(service.addSavedProperty(id)).toBe('Object is not present in Results Array. Cannot add to saved properties.');
    });

    it('should not add duplicate property to saved properties array if existing id is passed', () => {
      const id = '3';
      service.addSavedProperty(id);
      expect(service.addSavedProperty(id)).toBe('Property already added in Saved Properties');
    });

    it('should not add property to saved properties array if empty id is passed', () => {
      const id = '';
      expect(service.addSavedProperty(id)).toBe('Error: Unable to update Saved Properties. Null Property object.');
    });
  });

  describe('PropertyDetailsService: removeSavedProperty(id: string)', () => {
    it('should remove property from saved properties array if valid id is passed', () => {
      const id = '1';
      service.addSavedProperty(id);
      expect(service.removeSavedProperty(id)).toBe(`Removed property id: ${id} from saved properties.`);
    });

    it('should not add property to saved properties array if empty or invalid id is passed', () => {
      let id = '4';
      service.removeSavedProperty(id);
      expect(service.removeSavedProperty(id)).toBe('Error: Unable to update Saved Properties. Property id is invalid.');
      id = '-1';
      expect(service.removeSavedProperty(id)).toBe('Error: Unable to update Saved Properties. Property id is invalid.');
      id = 'test';
      expect(service.removeSavedProperty(id)).toBe('Error: Unable to update Saved Properties. Property id is invalid.');
      id = '';
      expect(service.removeSavedProperty(id)).toBe('Error: Unable to update Saved Properties. Property id is invalid.');
    });
  });

});
