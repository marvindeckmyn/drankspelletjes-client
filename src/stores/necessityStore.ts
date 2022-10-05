import { get, writable, Writable } from "svelte/store"
import { GameNecessity } from "../components/models"
import { http } from "../http";
import { doFetch } from "../utils";

const URLS = {
  NECESSITY: '/api/game/necessity',
}

class NecessityStore {
  newNecessity: Writable<GameNecessity>;
  newNecessities: Writable<GameNecessity[]>;

  constructor() {
    this.newNecessity = writable(new GameNecessity(undefined));
    this.newNecessities = writable([]);
  }

  // postNecessities creates new necessities.
  postNecessities = async (necessityId: string) => {
    const necessities = this.newNecessities
    
    get(necessities).forEach(async newNecessity => {
      newNecessity.game = necessityId;

      const { status } = await doFetch(URLS.NECESSITY, 'POST',
      get(this.newNecessity)) as { status: number };

      if (status !== http.STATUS_OK) {
        throw new Error('FAILED_TO_POST_NECESSITY');
      }
    })
    
  }
}

export default new NecessityStore();