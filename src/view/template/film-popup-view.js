import { createElement, render } from '../../render.js';
import AbstractView from '../../framework/view/abstract-view.js';


function createFilmPopup() {
  return '<section class="film-details"></section>';
}

function createInnerContainer() {
  return '<div class="film-details__inner"></div>';
}

export default class NewFilmPopupView extends AbstractView {
  #element = null;
  #topContainer;
  #bottomContainer;

  constructor(topContainer, bottomContainer) {
    super();
    this.#topContainer = topContainer;
    this.#bottomContainer = bottomContainer;
  }

  get template() {
    return createFilmPopup();
  }

  #getInner() {
    return createInnerContainer();
  }

  #addContainer(container) {
    return this.element.insertAdjacentElement('beforeend', container);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
      const innerContainer = createElement(this.#getInner());
      this.#addContainer(innerContainer);
      render(this.#topContainer, innerContainer);
      render(this.#bottomContainer, innerContainer);
    }
    return this.#element;
  }
}
