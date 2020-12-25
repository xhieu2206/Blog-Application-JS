import { elements } from './base';

import * as containerView from './containerView';

const renderFeed = feed => {
    return `
      <div class="article-preview">
        <div class="article-meta">
          <a href="javascript:void(0)"><img src="${feed.author.image}" /></a>
          <div class="info">
            <a href="javascript:void(0)" class="author">${feed.author.username}s</a>
            <span class="date">${feed.createdAt}</span>
          </div>
          <button class="btn ${feed.favorited ? 'btn-primary' : 'btn-outline-primary'} btn-sm pull-xs-right">
            <i class="ion-heart"></i>${feed.favoritesCount}
          </button>
        </div>
        <a href="javascript:void(0)" class="preview-link">
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
