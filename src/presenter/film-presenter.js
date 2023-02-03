import { remove, render, replace } from '../framework/render.js';
import { UpdateType, UserAction } from '../utils/const.js';
import FilmCardView from '../view/main-films-list/film-card-view.js';

export default class FilmPresenter {
  #film;
  #commentsModel;

  #handleDataChange;
  #handleOpenPopup;

  #filmCardComponent = null;

  constructor({ film, commentsModel, onDataChange, onFilmClick }) {
    this.#film = film;
    this.#commentsModel = commentsModel;

    this.#handleDataChange = onDataChange;
    this.#handleOpenPopup = onFilmClick;
  }

  #createFilmCard() {
    return new FilmCardView({
      film: this.#film,
      onFilmControlButtonFilterClick: this.#handleFilmControlButtonFilterClick,
      onFilmClick: this.openPopupHandler
    });
  }

  openPopupHandler = () => {
    this.#handleOpenPopup({
      film: this.#film,
      handleDataChange: this.#handleDataChange,
    });
    this.#handleDataChange(
      UserAction.OPEN_POPUP,
      UpdateType.GET_COMMENT,
      this.#film
    );
  };

  #handleFilmControlButtonFilterClick = (filterType) => {
    this.#film.user_details[filterType] = !this.#film.user_details[filterType];
    this.#handleDataChange(
      UserAction.UPDATE_FILM,
      UpdateType.CLOSED_POPUP,
      this.#film
    );
  };

  #rerenderCard() {
    const updateFilmCard = this.#createFilmCard();
    replace(updateFilmCard, this.#filmCardComponent);
    this.#filmCardComponent = updateFilmCard;
  }

  destroy() {
    remove(this.#filmCardComponent);
  }

  init(place) {
    if (this.#filmCardComponent) {
      return this.#rerenderCard();
    }

    this.#filmCardComponent = this.#createFilmCard();
    render(this.#filmCardComponent, place);
  }

}
