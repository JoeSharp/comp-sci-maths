import { HumanResourceMachineChallenge } from "./types";

const challenges: HumanResourceMachineChallenge[] = [
    {
        title: 'Mail Room',
        description: 'Your program should tell the worker to grab each thing from the INBOX and drop it in the OUTBOX',
        solution: `-- HUMAN RESOURCE MACHINE PROGRAM --
        INBOX   
        OUTBOX  
        INBOX   
        OUTBOX  
        INBOX   
        OUTBOX  
    `
    }
    , {
        title: 'Busy Mail Room',
        description: 'Grab each thing from the INBOX, and drop it into the OUTBOX',
        solution: `-- HUMAN RESOURCE MACHINE PROGRAM --

        a:
            INBOX   
            OUTBOX  
            JUMP     a        
        `
    }, {
        title: "Copy Floor",
        description: `Ignore the INBOX for now, send the following 3 items to the OUTBOX\n\nB U G`,
        solution: `-- HUMAN RESOURCE MACHINE PROGRAM --

        COPYFROM 4
        OUTBOX  
        COPYFROM 0
        OUTBOX  
        COPYFROM 3
        OUTBOX  
    `
    }
    // ,{
    //     title: '',
    //     description: '',
    //     solution: ``
    // }
]

export default challenges;