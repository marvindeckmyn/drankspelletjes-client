import { Model } from './';

export interface IGameNecessity {
  id: string
  name: {[key: string]: string};
  game: string
}

class GameNecessity extends Model {
  id: string;
  name: {[key: string]: string};
  game: string;

  constructor(data: IGameNecessity | undefined) {
    super();
    this.id = data?.id;
    this.name = data?.name || {};
    this.game = data?.game;
  }
}

export default GameNecessity