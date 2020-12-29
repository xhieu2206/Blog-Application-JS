import { elements } from './base';
import { clearContentPage } from './containerView';

export const renderSettingForm = user => {
  clearContentPage();
  const markup = `
    <div class="settings-page">
      <div class="container page">
        <div class="row">

          <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">Your Settings</h1>

            <ul class="error-messages">
              <!-- <li>That email is already taken</li> -->
            </ul>

            <form>
              <fieldset>
                <fieldset class="form-group">
                  <input class="form-control" type="text" placeholder="URL of profile picture" value="${user.image ? user.image : ''}">
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="text" placeholder="Your Name" value="${user.username}">
                </fieldset>
                <fieldset class="form-group">
                  <textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you" value="${user.bio}"></textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="text" placeholder="Email" value="${user.email}">
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="password" placeholder="Password" value="${user.password}">
                </fieldset>
                <button class="btn btn-lg btn-primary pull-xs-right" id="UpdateSettingButton">
                  Update Settings
                </button>
              </fieldset>
            </form>
            <hr>
            <button class="btn btn-outline-danger" id="LogoutButton">
              Or click here to logout.
            </button>
          </div>

        </div>
      </div>
    </div>
  `;

  elements.contentContainer.insertAdjacentHTML('afterbegin', markup);
}

const renderFeed = feed => {
  return `
      <div class="article-preview">
        <div class="article-meta">
          <a href="javascript:void(0)">
            <img src="${feed.author.image}" />
          </a>
          <div class="info">
            <a
              href="javascript:void(0)"
              class="author author-link"
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

  if (document.querySelector('.articles-toggle')) {
    document.querySelector('.articles-toggle').insertAdjacentHTML('afterend', markup);
  }
}

export const renderArticleTagHeader = (activeIndex = 0) => {
  let markup = `
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">

          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link active" href="javascript:void(0)">My Articles</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="javascript:void(0)">Favorited Articles</a>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  `;

  document.querySelector('.user-info').insertAdjacentHTML('afterend', markup);
  const elements = Array.from(document.querySelectorAll('.nav-link'));
  elements[activeIndex].classList.add('active');
}

export const renderProfilePicture = (profile, user) => {
  clearContentPage();
  let markup = `<div class="profile-page"></div>`;
  elements.contentContainer.insertAdjacentHTML('afterbegin', markup);
  markup = `
    <div class="user-info">
      <div class="container">
        <div class="row">

          <div class="col-xs-12 col-md-10 offset-md-1">
            <img src="${profile.image}" class="user-img" />
            <h4>${profile.username}</h4>
            <p>${profile.bio ? profile.bio : ''}</p>
            ${profile.username === user.username ? `
              <a
                class="btn btn-sm btn-outline-secondary action-btn edit-profile-button"
                href="javascript:void(0)">
                <i class="ion-gear-a"></i> Edit Profile Settings
              </a>
            ` : `
              <button
                class="btn btn-sm action-btn follow-user-button ${profile.following ? 'btn-secondary' : 'btn-outline-secondary'}"
                data-followuser="${profile.username}"
              >
                <i class="ion-plus-round"></i>
                &nbsp;
                ${profile.following ? 'Unfollow' : 'Follow'} ${profile.username}
              </button>
            `}
          </div>

        </div>
      </div>
    </div>
  `;

  document.querySelector('.profile-page').insertAdjacentHTML('beforeend', markup);
}

const renderPageItem = (page, active = false) => `<li class="page-item${active ? ' active' : ''}" data-gotopage="${page}"><a class="page-link">${page}</a></li>`;

export const renderPageItems = (pages, activePageIndex) => {
  let arr = [];
  for (let i = 1; i <= pages; i++) {
    arr.push(i);
  }
  const markup = `
    <nav>
      <ul class="pagination">
        ${arr.map(el => {
          if (activePageIndex == el) return renderPageItem(el, true)
          return renderPageItem(el)
        }).join('')}
      </ul>
    </nav>
  `;

  document.querySelector('.articles-toggle').parentElement.insertAdjacentHTML('beforeend', markup);
}
