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

export const getInputFieldsSettingForm = () => {
  return {
    image: document.querySelector(`[placeholder="URL of profile picture"]`).value,
    username: document.querySelector(`[placeholder="Your Name"]`).value,
    bio: document.querySelector(`[placeholder="Short bio about you"]`).value,
    email: document.querySelector(`[placeholder="Email"]`).value,
    password: document.querySelector(`[placeholder="Password"]`).value
  }
}

export const clearErrorsContainer = () => {
  document.querySelector('.error-messages').innerHTML = '';
}

export const renderErrors = (errors) => {
  clearErrorsContainer();

  for (const prop in errors) {
    errors[prop].forEach(e => {
      const markup = `<li>${prop} ${e}</li>`;
      document.querySelector('.error-messages').insertAdjacentHTML('beforeend', markup);
    });
  }
}

export const clearInputFieldCommentBody = () => {
  document.querySelector('[placeholder="Write a comment..."]').value = '';
}

export const getInputFieldCommentBody = () => {
  return {
    body: document.querySelector('[placeholder="Write a comment..."]').value
  }
}

export const rerenderFollowButton = profile => {
  const elements = Array.from(document.querySelectorAll(`[data-followuser="${profile.username}"]`));
  elements.forEach(el => {
    if (el.classList.contains('btn-secondary')) {
      el.classList.remove('btn-secondary');
      el.classList.add('btn-outline-secondary');
    } else {
      el.classList.remove('btn-outline-secondary');
      el.classList.add('btn-secondary');
    }
    const markup = `
    <i class="ion-plus-round"></i> ${profile.following ? `Unfollow ${profile.username}` : `Follow ${profile.username}`}
    `;
    el.innerHTML = '';
    el.insertAdjacentHTML('afterbegin', markup);
  });
}
