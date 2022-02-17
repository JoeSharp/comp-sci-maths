import { pickRandom } from "common";

const DOORS: number[] = [1, 2, 3];

function montyHall(switchDoor: boolean): boolean {
    // Put the prize behind random door
    const correctDoor: number = pickRandom(DOORS);

    // User picks a door
    let userChoice: number = pickRandom(DOORS);

    // Which of the other doors could host open?
    const hostCouldOpen = DOORS.filter(x => x !== correctDoor && x !== userChoice);

    // Pick one for host to open
    const hostOpens = pickRandom(hostCouldOpen);

    // Which door could user switch to?
    const other = pickRandom(DOORS.filter(x => x !== userChoice && x !== hostOpens));

    // If the user is switching, execute the switch
    if (switchDoor) {
        userChoice = other;
    }

    // Did the user win?
    return correctDoor === userChoice;;
}

export default montyHall;