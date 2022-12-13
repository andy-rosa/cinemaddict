import { createElement } from '../../render.js';


function createFilmPopupCommentsCounter(value) {
  let commentsCounter = 'Comment';
  if (Number(value) > 1) {
    commentsCounter = 'Comments';
  }
  return `<h3 class="film-details__comments-title">${commentsCounter} <span class="film-details__comments-count">${value}</span></h3>`;
}

export default class NewFilmPopupCommentsCounterView {
  #element = null;
  #value;

  constructor(value) {
    this.#value = value;
  }

  get value() {
    return this.#value;
  }

  set value(newValue) {
    this.#value = newValue;
  }

  #getTemplate() {
    return createFilmPopupCommentsCounter(this.#value);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.#getTemplate());
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
