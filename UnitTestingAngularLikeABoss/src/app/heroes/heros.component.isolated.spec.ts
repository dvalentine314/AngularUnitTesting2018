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
            //establish what the simulated behavior will be from the mock service
            mockheroService.deleteHero.and.returnValue(of(true));
            component.heroes = HEROES;
            //act
            //SUBSCRIBE use the mock hero service.delete hero to delete hero from subscribe
            component.delete(HEROES[2]);

            expect(component.heroes.length).toBe(HEROES.length-1);
        })
        it('should call delete the selected hero from the service', () => { 
            mockheroService.deleteHero.and.returnValue(of(true));
            component.heroes = HEROES;
            //act
            //SUBSCRIBE use the mock hero service.delete hero to delete hero from subscribe
            component.delete(HEROES[2]);
            expect(mockheroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);

        })
    })
})