import { elements } from './views/base';
import * as bannerView from './views/bannerView';
import * as containerView from './views/containerView';
import * as authenicateFormView from './views/authenicateFormView';
import * as navbarView from './views/navbarView';
import * as feedsView from './views/feedsView';

import User from './models/User';
import Feed from './models/Feed';

const state = {
  currentPage: 'Home',
  user: new User(),
  feed: new Feed()
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
  const feeds = await state.feed.getArticles('', '', '', 0, 10);
  if (feeds.data.articles.length > 0) {
    articlesView.renderFeeds();
  }
});

elements.navbarContainer.addEventListener('click', e => {
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
  } else if (e.target.matches('#NewArticleLink, #NewArticleLink *')) {
    navbarView.toggleHighlightNavLink(state.currentPage, 'New Article');
    state.currentPage = 'New Article';
  } else if (e.target.matches('#SettingLink, #SettingLink *')) {
    navbarView.toggleHighlightNavLink(state.currentPage, 'Setting');
    state.currentPage = 'Setting';
  } else if (e.target.matches('#UsernameLink, #UsernameLink *')) {
    navbarView.toggleHighlightNavLink(state.currentPage, 'User');
    state.currentPage = 'User';
  }
});

const logUserIn = () => {
  // change the navbar
  navbarView.renderLoggedInUserNavbar(state.user.userData.username);

  // load Your Feed

  // render popular tags
}

const loginControl = async () => {
  const res = await state.user.login(authenicateFormView.getInputsSignIn().email, authenicateFormView.getInputsSignIn().password);

  if (state.user.userData) {
    console.log(state.user.userData);
    state.currentPage = 'Home'
    logUserIn();
  } else {
    console.log(res);
    authenicateFormView.renderErrors(res);
  }
}

const signupControl = async () => {
  const res = await state.user.signup(authenicateFormView.getInputsSignUp().username, authenicateFormView.getInputsSignUp().email, authenicateFormView.getInputsSignUp().password);

  if (state.user.userData) {
    console.log(state.user.userData);
    logUserIn();
  } else {
    console.log(res);
    authenicateFormView.renderErrors(res);
  }
}

elements.contentContainer.addEventListener('click', e => {
  // click on login button
  if (e.target.id === 'SignInButton') {
    e.preventDefault();
    loginControl();
  // click on signup button
  } else if (e.target.id === 'SignUpButton') {
    e.preventDefault();
    signupControl();
  }
});
