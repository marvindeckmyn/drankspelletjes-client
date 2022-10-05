import { get, writable, Writable } from 'svelte/store';
import { Game, GameNecessity } from '../components/models';
import type { IGame } from '../components/models/Game';
import { http } from '../http';
import { doFetch } from '../utils';

const URLS = {
  GAME: '/api/game',
  GAME_ID: (id: string) => `/api/game/${id}`,
  GAMES_BY_CATEGORY: (id: string) => `/api/game/category/${id}`,
}

class GameStore {
  games: Writable<Game[]>;
  newGame: Writable<Game>;
  selectedGame: Writable<Game>;

  constructor() {
    this.games = writable([]);
    this.newGame = writable(new Game(undefined));
    this.selectedGame = writable(new Game(undefined));
  }

  // getGamesByCategory fetches all the games of a category
  getGamesByCategory = async (id: string) => {
    const { status, data } = await doFetch(URLS.GAMES_BY_CATEGORY(id), 'GET');

    if (status !== http.STATUS_OK) {
      throw new Error('FAILED_TO_FETCH_GAMES_BY_CATEGORY');
    }

    const games = data.reduce((games, game) => {
      games.push(new Game(game))
      return games
    }, [])

    this.games.set(games);
  }

  // getGameById fetches the game by id.
  getGameById = async (id: string) => {
    const { status, data: currentGame } = await doFetch(URLS.GAME_ID(id), 'GET');

    if (status !== http.STATUS_OK) {
      throw new Error('FAILED_TO_FETCH_GAMEY');
    }

    this.selectedGame.update(selectedGame => {
      selectedGame = currentGame;
      return selectedGame;
    })
  }

  // setSelectedGame changes the selected game to the given game.
  setSelectedGame = (game: Game) => {
    this.selectedGame.set(game);
  }

  // postGame creates a new game.
  postGame = async () => {
    const { status, data: game } = await doFetch(URLS.GAME, 'POST',
    get(this.newGame)) as { status: number, data: IGame };

    if (status !== http.STATUS_OK) {
      throw new Error('FAILED_TO_POST_GAME');
    }

    this.games.update(games => {
      games.push(new Game(game));
      return games;
    })

    return game.id;
  }

  // updateGame updates an existing game.
  updateGame = async () => {
    const game = get(this.selectedGame)
    const { status } = await doFetch(URLS.GAME_ID(game.id), 'PUT', game);

    if (status !== http.STATUS_OK) {
      throw new Error('FAILED_TO_UPDATE_GAME');
    }

    this.games.update(games => {
      const index = games.indexOf(game);
      if (index > -1) {
        games[index] = game;
      }

      games.sort((a, b) => {
        return a.order - b.order
      })

      return games;
    })
  }

  // deleteGame deletes an existing game.
  deleteGame = async (game: Game) => {
    const { status } = await doFetch(URLS.GAME_ID(game.id), 'DELETE');

    if (status !== http.STATUS_OK) {
      throw new Error('FAILED_TO_DELETE_GAME');
    }

    this.games.update(games => {
      const index = games.indexOf(game);
      if (index > -1) {
        games.splice(index, 1);
      }
      return games;
    })
  }
}

export default new GameStore();