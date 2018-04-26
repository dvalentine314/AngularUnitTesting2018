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