import { createElement } from '../../render.js';

const YEAR_START_POSITION = 11;
const YEAR_END_POSITION = 15;

function createCardFilmDescription({ title, total_rating: rating, release, duration, genre, poster, description }, counter) {
  const year = String(release.date).slice(YEAR_START_POSITION, YEAR_END_POSITION);
  let commentsCounter = 'comment';
  if (Number(counter) > 1) {
    commentsCounter = 'comments';
  }
  return `<a class="film-card__link">
            <h3 class="film-card__title">${title}</h3>
            <p class="film-card__rating">${rating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${year}</span>
              <span class="film-card__duration">${duration}</span>
              <span class="film-card__genre">${genre.join(', ')}</span>
            </p>
            <img src="${poster}" alt="" class="film-card__poster">
            <p class="film-card__description">${description}</p>
            <span class="film-card__comments">${counter} ${commentsCounter}</span>
          </a>`;
}

export default class NewFilmCardDescriptionView {
  constructor ({film_info: filmInfo, comments}) {
    this.filmInfo = filmInfo;
    this.comments = comments;
  }

  getTemplate() {
    return createCardFilmDescription(this.filmInfo, this.comments.length);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
