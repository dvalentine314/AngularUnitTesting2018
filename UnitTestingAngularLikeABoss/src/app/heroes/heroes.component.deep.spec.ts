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

        //deep tests that trigers an event and calls the one below
        it('should call heroservice.deleteHero when the herocompoennts delete button is clicked', () => { 
            mockheroService.getHeroes.and.returnValue(of(HEROES));
            fixture.detectChanges();
            spyOn(fixture.componentInstance, 'delete');
            const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
            
            // Method 1 for raising the event    
            // this method is just causing the event on a HTML element
            // heroComponents[0].query(By.css('button')).triggerEventHandler('click', {stopPropagation: () => {} })
            // Method 2 of raising the event
            // this method gets a handle to the event emitter and calls it
            // (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);
            // Method 3 of raising the event
            // this method will raise ANY event you put in here. If there is no listener in the template (eventname)="blah" then nothing will listen. so if we raise "crap" then there must be (crap)="blah()" in the parent template. That's all that matter. So technically this doesn't dig very far into the child and doesn't really care about the implementation of the child.
            heroComponents[0].triggerEventHandler('delete', null);
        
        
            expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
        });

        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
    })

})