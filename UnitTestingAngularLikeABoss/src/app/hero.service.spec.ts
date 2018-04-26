import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Http, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { HeroService } from './hero.service';
import { HttpClient } from '@angular/common/http';
import { Data } from '@angular/router';
import { MessageService } from './message.service';

describe('HeroService', () => {
  // let mockResponse, matchingHero, connection;
  let matchingHero;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let mockMessageService;

  beforeEach(() => {
    mockMessageService = {add: () => {}}

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        HeroService,
        { provide: MessageService, useValue: mockMessageService }
      ]
    });

    const heroes = [
      {id: 2, name: 'Rubberman'},
      {id: 4, name: 'Dynama'}
    ];
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  describe('getHero', () => {

    it('should call get with the correct URL',
      inject([HeroService], (service: HeroService) => {
        const testData: Data = {id: 4, name: 'Rubberman'}

          service.getHero(4).subscribe(hero => { matchingHero = hero; });

          const req = httpTestingController.expectOne('api/heroes/4')
          //console.log(0);//order of code exicution
          req.flush(testData);// gotes back to line 41 and emits the value, flush out the result of this obervable with this data.
          //console.log(2);
          httpTestingController.verify();
        //console.log(3)  
    }));

  });
});