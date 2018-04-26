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