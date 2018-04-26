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

    it('should have correct hero id', () => { 
        fixture.componentInstance.hero = { id: 1, name: 'SuperDude', strength: 20 };
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toContain(fixture.componentInstance.hero.id)
        
    })
})