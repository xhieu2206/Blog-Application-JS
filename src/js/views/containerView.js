import { elements } from "./base";

export const removeHomePageContainer = () => {
  const element = document.querySelector('.home-page');
  if (element) {
    element.parentElement.removeChild(element);
  }
}

export const renderHomePageContainer = () => {
  const markup = `<div class="home-page"></div>`;

  if (!document.querySelector('.home-page')) {
    elements.contentContainer.insertAdjacentHTML('afterbegin', markup);
  }
}


export const clearContentPage = () => {
  elements.contentContainer.innerHTML = "";
}
