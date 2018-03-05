export class BasicAttraction {
  id?: number;
  name: string;
  category: string;
  description?: string;
  picture?: any
}

export class Attraction extends BasicAttraction {
    latitude: number;
    longitude: number;
    radius: number;
}

export class MuseumAttraction extends BasicAttraction {}
