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