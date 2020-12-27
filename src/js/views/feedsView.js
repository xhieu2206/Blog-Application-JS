import { elements } from './base';

import * as containerView from './containerView';

export const rerenderArticle = (article, page) => {
  const elements = Array.from(document.querySelectorAll(`[data-lovearticle="${article.slug}"]`));
  elements.forEach(element => {
    if (element.classList.contains('btn-primary')) {
      element.classList.remove('btn-primary');
      element.classList.add('btn-outline-primary');
    } else {
      element.classList.remove('btn-outline-primary');
      element.classList.add('btn-primary');
    }
    const markup = `
      <i class="ion-heart"></i> ${page == 'Home' ? article.favoritesCount : article.favorited ? `Unfavorite Article (${article.favoritesCount})` : `Favorited Article (${article.favoritesCount})`}
    `;
    element.innerHTML = '';
    element.insertAdjacentHTML('afterbegin', markup);
  });
}

const renderFeed = feed => {
    return `
      <div class="article-preview">
        <div class="article-meta">
          <a
            href="javascript:void(0)"
            data-author="${feed.author.username}">
              <img src="${feed.author.image}" />
          </a>
          <div class="info">
            <a
              href="javascript:void(0)"
              class="author"
              data-author="${feed.author.username}">
                ${feed.author.username}
            </a>
            <span class="date">${feed.createdAt}</span>
          </div>
          <button
            class="btn ${feed.favorited ? 'btn-primary' : 'btn-outline-primary'} btn-sm pull-xs-right favorite-feed-button"
            data-lovearticle="${feed.slug}"
          >
            <i class="ion-heart"></i>${feed.favoritesCount}
          </button>
        </div>
        <a
          href="javascript:void(0)"
          class="preview-link"
          data-articledetail="${feed.slug}"
        >
          <h1>${feed.title}</h1>
          <p>${feed.description}</p>
          <span>Read more...</span>
        </a>
      </div>
    `;
}

export const renderFeeds = feeds => {
  let markup;

  if (feeds.length > 0) {
    markup = `
      ${feeds.map(feed => renderFeed(feed)).join('')}
    `;
  } else {
    markup = `<div class="article-preview">No articles are here... yet.</div>`
  }

  if (document.querySelector('.col-md-9')) {
    document.querySelector('.col-md-9').insertAdjacentHTML('beforeend', markup);
  }
}
