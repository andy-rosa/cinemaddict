import { createElement } from '../../render.js';
import { setHumanizeDateComment } from '../../utils.js';

function createFilmPopupComment({ author, emotion, date, comment}) {
  return `
  <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-sleeping">
            </span>
            <div>
              <p class="film-details__comment-text">${comment}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${author}</span>
                <span class="film-details__comment-day">${ setHumanizeDateComment(date) }</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`;
}

export default class NewFilmPopupCommentView {
  constructor(comment) {
    this.comment = comment;
  }

  getTemplate() {
    return createFilmPopupComment(this.comment);
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
