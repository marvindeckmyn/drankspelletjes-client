import Validator,  { IValidationObject } from '../validator/Validator'
import { Model } from './';

export interface IGame {
  id: string;
  game_category: string;
  game_necessity: string;
  name: {[key: string]: string};
  alias: {[key: string]: string};
  player_count: number;
  image: string;
  credits: string;
  description: {[key: string]: string};
  highlight: boolean;
  views: number;
  order: number;
  imageBlob: string;
}

class Game extends Model {
  id: string;
  validation: IValidationObject;
  game_category: string;
  name: {[key: string]: string};
  alias: {[key: string]: string};
  player_count: number;
  image: string;
  credits: string;
  description: {[key: string]: string};
  highlight: boolean;
  views: number;
  order: number;
  imageBlob: string;

  constructor(data: IGame | undefined) {
    super();
    this.id = data?.id;
    this.game_category = data?.game_category;
    this.name = data?.name || {};
    this.alias = data?.alias || {};
    this.player_count = data?.player_count || 0;
    this.image = data?.image;
    this.credits = data?.credits || '';
    this.description = data?.description || {};
    this.highlight = data?.highlight || false;
    this.views = data?.views || 0;
    this.order = data?.order || 0;

    this.validation = {
      name: Validator.input('enter_a_valid_name'),
    }

    Validator.initalize(this, this.validation)
  }
}

export default Game