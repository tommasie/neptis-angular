export class MuseumAttraction {
    name:string;
}

export class Room {
    id?: number;
    name:string;
    attraction_ms: MuseumAttraction[] = [];
    adjacent: Room[] = [];
    starting: boolean;
}

export class Museum {
    id?: number;
    name: string;
    rooms: Room[] = [];
    start: Room;
    end: Room;
}
