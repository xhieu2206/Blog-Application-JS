import { elements } from './base';

import * as containerView from './containerView';

const renderTagHeader = tagHeader => {
  return `
    <li class="nav-item">
      <a
        class="nav-link ${tagHeader == 'Your Feed' ? 'yourfeedheader' : tagHeader == 'Global Feed' ? 'globalfeedheader' : ''}"
        href="javascript:void(0)"
      >${tagHeader}</a>
    </li>
  `;
}

export const renderTagHeaders = (tagHeaders, activeHeaderIndex = 0) => {
  containerView.clearContentPage();
  containerView.renderHomePageContainer();
  const markup = `
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              ${tagHeaders.map(el => {
                return renderTagHeader(el);
              }).join('')}
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;
  document.querySelector('.home-page').insertAdjacentHTML('beforeend', markup);
  Array.from(document.querySelectorAll('.feed-toggle .nav-link'))[activeHeaderIndex].classList.add('active');
}
