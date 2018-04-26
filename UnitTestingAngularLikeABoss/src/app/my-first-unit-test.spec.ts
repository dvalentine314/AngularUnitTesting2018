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
