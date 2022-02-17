import ships from "./ships";
import asteroids from "./asteroids";
import monsters from "./monsters";

import { Images } from "./types";
import ImageSwitcher from "./ImageSwitcher";

const images: Images = {
  ships,
  asteroids,
  monsters
};

export { ImageSwitcher };

export default images;
