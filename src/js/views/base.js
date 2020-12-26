import * as containerView from './containerView';

export const elements = {
  navbarContainer: document.querySelector('.navbar'),
  contentContainer: document.querySelector('.content-container')
}

const formatTagList = tagsString => {
  return tagsString.replace(/ /g, '').split(',')
}

export const getInputFieldsNewArticleForm = () => {
  return {
    title: document.querySelector('[placeholder="Article Title"]').value,
    description: document.querySelector(`[placeholder="What's this article about?"]`).value,
    body: document.querySelector(`[placeholder="Write your article"]`).value,
    tagList: formatTagList(document.querySelector(`[placeholder="Enter tags"]`).value)
  }
}

export const clearErrorsContainer = () => {
  document.querySelector('.error-messages').innerHTML = '';
}

export const renderErrors = (errors) => {
  console.log(errors)
  clearErrorsContainer();

  for (const prop in errors) {
    errors[prop].forEach(e => {
      const markup = `<li>${prop} ${e}</li>`;
      document.querySelector('.error-messages').insertAdjacentHTML('beforeend', markup);
    });
  }
}
