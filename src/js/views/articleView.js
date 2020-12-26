import { formatISOdate } from '../utils/Date';
import { elements } from './base';
import * as containerView from './containerView';

export const renderNewArticleForm = () => {
  containerView.clearContentPage();
  const markup = `
  <div class="editor-page">
    <div class="container page">
      <div class="row">

        <ul class="error-messages">
          <!-- <li>That email is already taken</li> -->
        </ul>

        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input type="text" class="form-control form-control-lg" placeholder="Article Title">
              </fieldset>
              <fieldset class="form-group">
                <input type="text" class="form-control" placeholder="What's this article about?">
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control" rows="8" placeholder="Write your article"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input type="text" class="form-control" placeholder="Enter tags">
                <div class="tag-list"></div>
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary" id="create-article-button" type="button">
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
  `;

  elements.contentContainer.insertAdjacentHTML('afterbegin', markup);
}

export const renderArticleDetailPage = (user, article, comments = []) => {
  containerView.clearContentPage();
  const markup = `
  <div class="article-page">

    <div class="banner">
      <div class="container">

        <h1>${article.title}</h1>

        <div class="article-meta">
          <a href="javascript:void(0)"><img src="${article.author.image}" /></a>
          <div class="info">
            <a href="javascript:void(0)" class="author">${article.author.username}</a>
            <span class="date">${formatISOdate(article.createdAt)}</span>
          </div>
          ${user.username === article.author.username ? `
            <button class="btn btn-sm btn-outline-secondary">
              <i class="ion-edit"></i>&nbsp;
              Edit Article
            </button>
          ` : `
            <button class="btn btn-sm ${article.author.following ? 'btn-secondary' : 'btn-outline-secondary'}">
              <i class="ion-plus-round"></i>&nbsp;
              ${article.author.following ? 'Unfollow' : 'Follow'} ${article.author.username}
            </button>
          `}
          &nbsp;&nbsp;
          ${user.username === article.author.username ? `
            <button class="btn btn-sm btn-outline-danger">
              <i class="ion-trash-a"></i>&nbsp;
              Delete Article
            </button>
          ` : `
            <button class="btn btn-sm ${article.favorited ? 'btn-primary' : 'btn-outline-primary' }">
              <i class="ion-heart"></i>
              &nbsp;
              ${article.favorited ? 'Unfavorite Post' : 'Favorite Post' }
              <span class="counter">(${article.favoritesCount})</span>
            </button>
          `}
        </div>

      </div>
    </div>

    <div class="container page">

      <div class="row article-content">
        <div class="col-md-12">
          ${article.body}
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <div class="article-meta">
          <a href="javascript:void(0)">
            <img src="${article.author.image}" />
          </a>
          <div class="info">
            <a href="javascript:void(0)" class="author">${article.author.username}</a>
            <span class="date">${formatISOdate(article.createdAt)}</span>
          </div>

          ${user.username === article.author.username ? `
            <button class="btn btn-sm btn-outline-secondary">
              <i class="ion-edit"></i>&nbsp;
              Edit Article
            </button>
          ` : `
            <button class="btn btn-sm ${article.author.following ? 'btn-secondary' : 'btn-outline-secondary'}">
              <i class="ion-plus-round"></i>&nbsp;
              ${article.author.following ? 'Unfollow' : 'Follow'} ${article.author.username}
            </button>
          `}
          &nbsp;&nbsp;
          ${user.username === article.author.username ? `
            <button class="btn btn-sm btn-outline-danger">
              <i class="ion-trash-a"></i>&nbsp;
              Delete Article
            </button>
          ` : `
            <button class="btn btn-sm ${article.favorited ? 'btn-primary' : 'btn-outline-primary' }">
              <i class="ion-heart"></i>
              &nbsp;
              ${article.favorited ? 'Unfavorite Post' : 'Favorite Post' }
              <span class="counter">(${article.favoritesCount})</span>
            </button>
          `}
        </div>
      </div>

      <div class="row">

        <div class="col-xs-12 col-md-8 offset-md-2">

          <form class="card comment-form">
            <div class="card-block">
              <textarea class="form-control" placeholder="Write a comment..." rows="3"></textarea>
            </div>
            <div class="card-footer">
              <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
              <button class="btn btn-sm btn-primary">
                Post Comment
              </button>
            </div>
          </form>

          <div class="card">
            <div class="card-block">
              <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
            </div>
            <div class="card-footer">
              <a href="" class="comment-author">
                <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
              </a>
              &nbsp;
              <a href="" class="comment-author">Jacob Schmidt</a>
              <span class="date-posted">Dec 29th</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
  `;

  elements.contentContainer.insertAdjacentHTML('beforebegin', markup);
}
