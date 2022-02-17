import p5, { Image } from "p5";
import { NamedImage } from "./types";

class ImageSwitcher {
  images: Image[];
  imageIndex: number;

  constructor(s: p5, namedImages: NamedImage[]) {
    this.images = namedImages.map((n) => s.loadImage(n.image));
    this.imageIndex = 0;
    this.randomImage();
  }

  nextImage() {
    this.imageIndex += 1;
    this.imageIndex %= this.images.length;
  }

  randomImage() {
    this.imageIndex = Math.floor(Math.random() * this.images.length);
  }

  currentImage(): Image {
    return this.images[this.imageIndex];
  }
}

export default ImageSwitcher;
