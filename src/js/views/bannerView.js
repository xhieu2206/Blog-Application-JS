import { elements } from './base';
import * as containerView from './containerView';

const bannerElement = `
  <div class="banner">
    <div class="container">
      <h1 class="logo-font">conduit</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>
`;

export const renderBanner = () => {
  containerView.renderHomePageContainer();
  const homePageElement = elements.homePageContainer;
  document.querySelector('.home-page').insertAdjacentHTML('afterbegin', bannerElement);
}

export const removeBanner = () => {
  const element = document.querySelector('.banner');
  if (element) {
    element.parentElement.removeChild(element);
  }
}
