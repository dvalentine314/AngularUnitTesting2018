# Unit testing like a boss

instructor: Joe Eams

> were not covering end to end testing in this module because there is plenty of good resources. cypris is a tool for this. also. it is kind of all the same reguardless of what frameworks you are using.
## links

- https://github.com/joeeames/UnitTestingAngularLikeABoss/graphs/contributors

## test frameworks

- karma and jasmine built into angular CLi
- alterantives
  - Jest

## unit tests

- intentially slightly vague
- tiny peice of code relative to whole application
- generally a single class of a single file
  - if its hard to test it might be doing too much

## Benefits of testing

- documented intentions
- self documenting
- improved design
- fewer bugs in production
- no regressions
- safer refactoring

## Libraries

- Frameworks
  - jasime
  - mocha
- Assertion librariers
  - verify something is true or false
  - jasmine
  - chai
  - should.js
  - expect
- mocking libaries
  - act as your dependencie
  - testdouble.js
  - Jasmine
- test runners
  - karma
  - jest
  - cyperis

### jasime syntax

- `decribes()` names the class
- `it()` defines aspects

## Writing good tests

### How to structure tests

#### tripple A arrangement

- **Arrange** all nessary preconditions and inputs
- **Act** on the object or method under test
- **Assert** that the expecte results have occured
  - one logical assert. might write 3 expects but watch for reaching outside the thing. semantically 1

Can also thing of it as :1 initial state, 2 change state, 3 resulting state

### Damp vs dry

- **dry** dont repeat yourself
- **Damp** some minor amount of duplication
  - not wet. sometimes to have a minor amount of dupilcation
- Rules
  - repeat yourself if it makes it easier to read
  - minimize logic out of tests

### tell the story

- a test should be a complete story, all within the _it()_
- you shouln't need to look around much to undersand the test
- techniques
  - remove less interesting setup to *beforeEach()*
  - keep critical setup within the *it()*
  - include all of the "Act" and "Assert" tests part are in the *it()* clause
  - tell a story

### best practices

- only test the unit and not its dependets or dependencies
- use to test doupbleto isolate dependencies
  - mocs and other stuff

### brittleness discussion

- is this actually what you want to happen?
- does it define requirements. document busness requirements
- may look at constants to protect for things like the magic string brittleness


## over testing

### things you shouldn't test:

- testing things that aren't your code
  - typescript
- tests that are unrealistic
- don't write test just for "code coverage"
  - some companies require code coverage and that can incentivise worthless tests.
- functionality is of low value. 
- (in tdd) overspeculating functionality. too many tests before hand.
- too much overlap

**good rule of thumb. does the test document the implementation?**

#### addiontal resoruces for best practices

- kent mag
- mark fowler
- the classics who basically invented unit testing

recommended code coverage tool

  - walabyjs (works in visual studio.) not free $100

you can document really obscure method behaviors with unit tests

## unit testing in angular (with karma/jasmine)

- Test file needs to be named XXX.spec.ts to be picked up by Karma.
- best practice is to create these spec files test right next to the file you are testing
- Unit tests must be atonomus. They don't garentee order.
(no state!)
- to run tests
  - command: npm test
  - sometimes the browser view will hide errors. you can get more of the call stack viewing the command line or the browser console.
- the project these tests are built upon  is similar to the tour of heros tutorial



### first example

```typescript
//my-first-unit-test.spec.ts
describe('my first test', () => {
    let obj: any;
    beforeEach(() => {
        obj = {}// intilalize here to make sure and protect state
    });

    it('should be true if true', () => { //should is sort of the convention. describes the convention
        obj.a = false; //could do this in for each but its part of the story so he reccomends having it here
        obj.a = true;

        expect(obj.a).toBe(true);
     })
})
```

### strength pipe

```typescript
//strength.pip.spec.ts
import { StrengthPipe } from "./strength.pipe";

describe('Pipe: strength', () => {
    it('should display weak if stregth is 5',()=> {
        //arrange
        let pipe = new StrengthPipe();
        //act
        let result = pipe.transform(5);
        //expect
        expect(result).toBe('5 (weak)')//could justify merging act and expect
    })
   
    it('should display weak if stregth is 5',()=> {//generally the test functions are not made to take values
        //arrange
        let pipe = new StrengthPipe();
        //expect
        expect(pipe.transform(10)).toBe('10 (strong)')//could justify merging act and expect
   })
});
```
### example 2

```typescript
//message.service.spec.ts
import { MessageService } from "./message.service";
import { SSL_OP_LEGACY_SERVER_CONNECT } from "constants";

describe('MessageService', () => { 
    it('should have no messages to start', () => {
        let service = new MessageService();

        expect(service.messages.length).toBe(0);
    })

    it('should add a message when add is called',()=> {
        let service = new MessageService();

        service.add('hello');

        expect(service.messages.length).toBe(1);
    })

    it('should remove all messages when clear is called',()=> {
        let service = new MessageService();

        service.messages['hello'];
        service.clear();

        expect(service.messages.length).toBe(0);
    }) //could also make it your own describe
})

describe('clear',()=> {
    it('should remove all messages', () => { 
        let service = new MessageService();
        service.add('hello');
        service.clear();
        expect(service.messages.length).toBe(0);

    })
})
```


### mocking

- also called isolated tests
- can use syntax xx.x.isolated.spec.ts

we are creating an isolated test that doesnt use any angular rendering. basically we are testing the "directive" part of the component irrespective of the template

beforeEach acts inside the describe. (describe sort of defines the scope for it). runs for every `it()` reguardless of how nested it is.

```typescript

//heros.componet.isolated.spec.ts
import { HeroesComponent } from "./heroes.component";
import { HeroService } from "../hero.service";
import { of } from "rxjs/observable/of"

describe('heros component (isolated)', () => {
    let component: HeroesComponent;
    let HEROES;
    let mockheroService: jasmine.SpyObj<HeroService>; 
    beforeEach(() => { 
        HEROES = [
            { id: 1, name: 'SpiderDude', strength: 24 },
            { id: 1, name: 'SpiderDude', strength: 24 },
            { id: 1, name: 'SpiderDude', strength: 24 }
        ];
        //delete hero, the method you are expecting. can mock a limited set
        mockheroService = jasmine.createSpyObj(['deleteHero'])

        //test the component not the service so we mock the service
        component = new HeroesComponent(mockheroService);
    })

    describe('delete', () => {
        it('should remove the selected hero from the hero list', () => { 
            mockheroService.deleteHero.and.returnValue(of(true));
            component.heroes = HEROES;
            //act
            //SUBSCRIBE
            component.delete(HEROES[2]);

            expect(component.heroes.length).toBe(HEROES.length-1);
        })
        //might write a second test for delete from the hero service. how does the component work with the service?
    })
})
```

## integration testing

you want to disable sourcemaps when running these because they can cause problems. 

package.json

```json
 "scripts": {
    "ng": "ng",
    "build": "ng build --prod",
    "start": "ng serve",
    "test": "ng test --sm false",//disable sourcemaps
    "lint": "tslint ./src/**/*.ts -t verbose",
    "e2e": "ng e2e"
  },
```

turns off sourcemap to deal with karma interation testing and making the error messages more useful. I imagine you turn them back on when you're done.

### purpose

- testing compiling componenents and using the injector
- two flavors
  - **shallow** mock related components
  - **deep** include all components and routing



### ngModule

- in angular everything lives in a module
- if we want to test a component with its template it has to be part of some kind of module. problem is that modules have a ton of stuff.

#### angular testing utilities

- `TestBed` harnes for compiling compoennts
  - configures a temparoary ngmodule for testing
  > fixture = textbed.createComponent(heroComponent);
  > the fixure is a wrapper around stuff
- `inject()` - provides access to injectables
- `async()` & fakeAsync()** async zone control

##### Component Fixture

- component instance
- _debugEleement()_ : points at a single node in the DOM.
- parent/childeren - the immediate parent or children of the DebugElement
  - query(predicate)
    - you can query the dom using css selectors
  - queryAll
    - injector
    - listeners
    - triggerEventHandler
- nativeElememnt - the native dom element at the root of the component
- detectChanges() - tests that our template is getting updated.
- whenStable()

### example

```typescript
import { TestBed, ComponentFixture } from "@angular/core/testing";
import { HeroComponent } from "./hero.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('Hero Component (shallow)', () => { 
    let fixture: ComponentFixture<HeroComponent>;
    beforeEach(() => { 
        TestBed.configureTestingModule({
            declarations: [HeroComponent],
            schemas:[NO_ERRORS_SCHEMA]
        });
        fixture = <ComponentFixture<HeroComponent>> TestBed.createComponent(HeroComponent);
    })

    it('should have the correct hero', () => {
        fixture.componentInstance.hero = { id: 1, name:'SuperDude', strength:20}

        expect(fixture.componentInstance.hero.name).toEqual('SuperDude')
    })

    //showing what value is displayed 
    it('should have the hero name inside and anchor tag', () => {
        fixture.componentInstance.hero = { id: 1, name: 'SuperDude', strength: 20 };
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('a')).nativeElement.textContent).toContain('SuperDude');
    });
})

```

could look at npm package to do mock component (mockComponent)


```typescript
//heroes.component.shallow.spec.ts
import { TestBed, ComponentFixture } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { NO_ERRORS_SCHEMA, Component, Input } from "@angular/core";
import { By } from "@angular/platform-browser";
import { HeroService } from "../hero.service";
import { of } from "rxjs/observable/of"


//create moc component by creating actual component
@Component({
    selector: 'app-hero',
    template: '<div><div>'
})
class MockHeroComponent{
    @Input() hero;
}

describe('Hero Component (shallow)', () => { 
    let fixture: ComponentFixture<HeroesComponent>;
    let HEROES;
    let mockheroService: jasmine.SpyObj<HeroService>; 
    beforeEach(() => { 
        HEROES = [
            { id: 1, name: 'SpiderDude', strength: 24 },
            { id: 1, name: 'SpiderDude', strength: 24 },
            { id: 1, name: 'SpiderDude', strength: 24 }
        ];
        //delete hero, the method you are expecting. can mock a limited set
        mockheroService = jasmine.createSpyObj(['getHeroes'])
        TestBed.configureTestingModule({
            declarations: [HeroesComponent, MockHeroComponent],
            providers: [{provide:HeroService, useValue:mockheroService}],
            //schemas:[NO_ERRORS_SCHEMA]// ingores app-hero
        });
        fixture = <ComponentFixture<HeroesComponent>>TestBed.createComponent(HeroesComponent);
        
    })

    describe('ngOnInit', () => { 
        it('should set heroes correctly from service', () => {mockheroService.getHeroes.and.returnValue(of(HEROES))
            fixture.detectChanges();// fires ngonint
            expect(fixture.componentInstance.heroes.length).toBe(3);
        })
    })

})
```

## deep integration test

```typescript
//heroes.component.deep.spec.ts
import { TestBed, ComponentFixture } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { NO_ERRORS_SCHEMA, Component, Input } from "@angular/core";
import { By } from "@angular/platform-browser";
import { HeroService } from "../hero.service";
import { of } from "rxjs/observable/of"
import { HeroComponent } from "../hero/hero.component";


//create moc component by creating actual component
@Component({
    selector: 'app-hero',
    template: '<div><div>'
})
class MockHeroComponent{
    @Input() hero;
}

describe('Hero Component (deep)', () => { 
    let fixture: ComponentFixture<HeroesComponent>;
    let HEROES;
    let mockheroService: jasmine.SpyObj<HeroService>; 
    beforeEach(() => { 
        HEROES = [
            { id: 1, name: 'SpiderDude', strength: 24 },
            { id: 1, name: 'SpiderDude', strength: 24 },
            { id: 1, name: 'SpiderDude', strength: 24 }
        ];
        //delete hero, the method you are expecting. can mock a limited set
        mockheroService = jasmine.createSpyObj(['getHeroes'])
        TestBed.configureTestingModule({
            declarations: [HeroesComponent, HeroComponent],
            providers: [{provide:HeroService, useValue:mockheroService}],
            schemas:[NO_ERRORS_SCHEMA]// ingores app-hero
        });
        fixture = <ComponentFixture<HeroesComponent>>TestBed.createComponent(HeroesComponent);
        
    })

    describe('intital rendering', () => { 
        it('should render each hero as a herocomponent', () => {mockheroService.getHeroes.and.returnValue(of(HEROES))
            mockheroService.getHeroes.and.returnValue(of(HEROES));
            fixture.detectChanges();// fires ngonint
            const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
            expect(heroComponents.length).toEqual(HEROES.length);
            expect(heroComponents[0].componentInstance.hero).toBe(HEROES[0]);
            
        })
    })

})
```
hero.service.ts
looking at all the different http calls

mock HttpTestingController

```typescript 

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

          service.getHero(4).subscribe(hero => { matchingHero = hero; console.log(1)});

          const req = httpTestingController.expectOne('api/heroes/4')
          console.log(0);//order of code exicution
          req.flush(testData);// gotes back to line 41 and emits the value, flush out the result of this obervable with this data.
          console.log(2);
          httpTestingController.verify();
        console.log(3)  
    }));

  });
});
```


> sometimes you have to open the console window in the browser. you can't trust the browser ui


## final thoughts 

- try to make your tests a story
- isolated test are faster and more complex. favor them over others.