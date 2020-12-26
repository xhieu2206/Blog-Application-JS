import { elements, renderErrors, getInputFieldsNewArticleForm } from './views/base';
import * as bannerView from './views/bannerView';
import * as loadingView from './views/loadingView';
import * as containerView from './views/containerView';
import * as authenicateFormView from './views/authenicateFormView';
import * as navbarView from './views/navbarView';
import * as feedsView from './views/feedsView';
import * as tagHeaderView from './views/tagHeaderView';
import * as tagsView from './views/tagsView';
import * as pageItemsView from './views/pageItemsView';
import * as articleView from './views/articleView';

import User from './models/User';
import Feed from './models/Feed';
import Tag from './models/Tag';

const state = {
  currentPage: 'Home',
  tagHeaders: ['Global Feed'],
  activeHeaderIndex: 0,
  user: new User(),
  feed: new Feed(),
  tag: new Tag()
}


const renderHomePage = () => {
  // render header tag
  tagHeaderView.renderTagHeaders(state.tagHeaders, state.activeHeaderIndex);

  // render feeds
  feedsView.renderFeeds(state.feed.articles);

  // render tags
  tagsView.renderTags(state.tag.tags);

  // render pagination
  pageItemsView.renderPageItems(state.feed.totalPages, state.feed.currentPage);
}

window.addEventListener('load', async () => {
  if (!state.user.isLoggedIn) {
    navbarView.renderNavbar();
  } else {
    navbarView.renderLoggedInUserNavbar(state.user.userData.username);
  }
  if (state.currentPage === 'Home') {
    bannerView.renderBanner();
  } else {
    bannerView.removeBanner();
  }

  loadingView.renderLoading();
  await state.feed.getArticles('', '', '', 1, 10);
  await state.tag.getTags();
  renderHomePage();
});

elements.navbarContainer.addEventListener('click', async e => {
  if (e.target.matches('#SignInLink, #SignInLink *')) {
    navbarView.toggleHighlightNavLink(state.currentPage, 'Sign In');
    state.currentPage = 'Sign In';

    containerView.clearContentPage();

    // render Sign In form
    authenicateFormView.renderSignInForm();

  } else if (e.target.matches('#SignUpLink, #SignUpLink *')) {
    navbarView.toggleHighlightNavLink(state.currentPage, 'Sign Up');
    state.currentPage = 'Sign Up';

    containerView.clearContentPage();

    // render signup form
    authenicateFormView.renderSignUpForm();
  } else if (e.target.matches('#HomeLink, #HomeLink *')) {
    navbarView.toggleHighlightNavLink(state.currentPage, 'Home');
    state.currentPage = 'Home';

    loadingView.renderLoading();
    if (state.user.isLoggedIn) {
      await state.feed.getArticlesWithToken(state.user.getToken(), '', '', '', 1);
    } else {
      await state.feed.getArticles('', '', '', 1);
    }
    renderHomePage()
  } else if (e.target.matches('#NewArticleLink, #NewArticleLink *')) {
    navbarView.toggleHighlightNavLink(state.currentPage, 'New Article');
    state.currentPage = 'New Article';

    // render new article page (form)
    articleView.renderNewArticleForm();

  } else if (e.target.matches('#SettingLink, #SettingLink *')) {
    navbarView.toggleHighlightNavLink(state.currentPage, 'Setting');
    state.currentPage = 'Setting';
  } else if (e.target.matches('#UsernameLink, #UsernameLink *')) {
    navbarView.toggleHighlightNavLink(state.currentPage, 'User');
    state.currentPage = 'User';
  }
});

const logUserIn = async () => {
  // change the navbar
  navbarView.renderLoggedInUserNavbar(state.user.userData.username);

  // set the tag header items
  state.tagHeaders = ['Your Feed', 'Global Feed'];
  state.activeHeaderIndex = 0;

  // Load your feeds
  loadingView.renderLoading();
  await state.feed.getFeeds(state.user.getToken(), 1);

  renderHomePage();

  // render popular tags
}

const loginControl = async () => {
  const res = await state.user.login(authenicateFormView.getInputsSignIn().email, authenicateFormView.getInputsSignIn().password);

  if (state.user.userData) {
    state.currentPage = 'Home'
    logUserIn();
  } else {
    renderErrors(res);
  }
}

const signupControl = async () => {
  const res = await state.user.signup(authenicateFormView.getInputsSignUp().username, authenicateFormView.getInputsSignUp().email, authenicateFormView.getInputsSignUp().password);

  if (state.user.userData) {
    logUserIn();
  } else {
    renderErrors(res);
  }
}

const renderArticleDetailPage = () => {
  articleView.renderArticleDetailPage(state.user.userData, state.feed.currentArticle);
}

elements.contentContainer.addEventListener('click', async (e) => {
  // click on login button
  if (e.target.id === 'SignInButton') {
    e.preventDefault();
    await loginControl();
  // click on signup button
  } else if (e.target.id === 'SignUpButton') {
    e.preventDefault();
    await signupControl();
  } else if (e.target.classList.contains('globalfeedheader')) {
    state.tag.setTag('');

    loadingView.renderLoading();
    if (state.user.isLoggedIn) {
      state.activeHeaderIndex = 1;
      if (state.tagHeaders.length > 2) state.tagHeaders.splice(2, 1);
      await state.feed.getArticlesWithToken(state.user.getToken(), state.tag.tag, '', '', 1);
    } else {
      if (state.tagHeaders.length > 1) state.tagHeaders.splice(1, 1);
      state.activeHeaderIndex = 0;
      await state.feed.getArticles(state.tag.tag, '', '', 1);
    }

    renderHomePage();
  } else if (e.target.classList.contains('yourfeedheader')) {
    state.tag.setTag('');
    state.activeHeaderIndex = 0;
    if (state.tagHeaders.length > 2) state.tagHeaders.splice(2, 1);

    loadingView.renderLoading();
    await state.feed.getFeeds(state.user.getToken(), 1);

    renderHomePage();
  } else if (e.target.matches('.page-item, .page-item *')) {
    const page = parseInt(e.target.closest('.page-item').dataset.gotopage, 10);

    loadingView.renderLoading();
    if (state.user.isLoggedIn) {
      await state.feed.getArticlesWithToken(state.user.getToken(), state.tag.tag, '', '', page);
      await state.tag.getTags();
    } else {
      await state.feed.getArticles(state.tag.tag, '', '', page);
      await state.tag.getTags();
    }

    renderHomePage();
  } else if (e.target.matches('.tag-pill, .tag-pill *')) {
    const tag = e.target.closest('.tag-pill').dataset.selecttag;
    state.tag.setTag(tag);
    loadingView.renderLoading();

    if (state.user.isLoggedIn) {
      if (state.tagHeaders.length === 3) state.tagHeaders.pop();
      await state.feed.getArticlesWithToken(state.user.getToken(), tag, '', '', 1);
      await state.tag.getTags();
      state.activeHeaderIndex = 2;
    } else {
      if (state.tagHeaders.length === 2) state.tagHeaders.pop();
      await state.feed.getArticles(tag, '', '', 1);
      await state.tag.getTags();
      state.activeHeaderIndex = 1;
    }

    state.tagHeaders.push(`#${state.tag.tag}`);
    renderHomePage();
  } else if (e.target.id === 'create-article-button') {
    // call api to submit the article
    const res = await state.feed.newFeed(
      state.user.token,
      getInputFieldsNewArticleForm().title.toString(),
      getInputFieldsNewArticleForm().description.toString(),
      getInputFieldsNewArticleForm().body.toString(),
      getInputFieldsNewArticleForm().tagList.toString()
    );

    // handle error
    if (state.feed.currentArticle.slug) {
      console.log(state.feed.currentArticle);
      renderArticleDetailPage();
    } else {
      renderErrors(res);
    }
  }
});
