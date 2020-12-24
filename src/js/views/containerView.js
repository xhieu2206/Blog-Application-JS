import { elements } from "./base";

export const renderHomePageContainer = () => {
  const markup = `<div class="home-page"></div>`;

  elements.contentContainer.insertAdjacentHTML('afterbegin', markup);
}

export const removeHomePageContainer = () => {
  const element = document.querySelector('.home-page');
  if (element) {
    element.parentElement.removeChild(element);
  }
}

export const clearContentPage = () => {
  elements.contentContainer.innerHTML = "";
}
