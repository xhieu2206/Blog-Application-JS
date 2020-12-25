import * as containerView from './containerView';
import { elements } from './base';

export const renderLoading = () => {
  containerView.clearContentPage();
  const markup = `<h3 class="text-center">Loading ...</h3>`;
  elements.contentContainer.insertAdjacentHTML('afterbegin', markup);
}
