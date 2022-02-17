export interface NamedImage {
  name: string;
  image: any;
}

export interface Images {
  ships: NamedImage[];
  asteroids: NamedImage[];
  monsters: NamedImage[];
}
