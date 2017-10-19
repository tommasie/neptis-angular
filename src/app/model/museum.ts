export class MuseumAttraction {
    name:string;
}

export class Room {
    name:string;
    attraction_ms: MuseumAttraction[] = [];
    adjacent: Room[] = [];
}

export class Museum {
    id?: number;
    name: string;
    latitude: number;
    longitude: number;
    radius: number;
    rooms: Room[] = [];
    start: Room;
    end: Room;
}
