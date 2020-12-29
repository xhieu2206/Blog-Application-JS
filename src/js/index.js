import { elements, renderErrors, clearErrorsContainer, getInputFieldsNewArticleForm, getInputFieldsSettingForm, getInputFieldCommentBody, clearInputFieldCommentBody, rerenderFollowButton } from './views/base';
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
import * as profileView from './views/profileView';

import User from './models/User';
import UserData from './models/UserData';
import Feed from './models/Feed';
import Tag from './models/Tag';
import Comment from './models/Comment';

const state = {
  currentPage: 'Home',
  tagHeaders: ['Global Feed'],
  activeHeaderIndex: 0,
  activeProfileHeaderIndex: 0,
  user: new User(),
  feed: new Feed(),
  tag: new Tag(),
  comment: new Comment()
}

state.user.userData = new UserData();

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

const renderProfile = async () => {
  // render profile picture + follow button
  profileView.renderProfilePicture(state.user.currentProfile, state.user.userData);

  // render header tag
  profileView.renderArticleTagHeader(state.activeProfileHeaderIndex);

  // render feed
  profileView.renderFeeds(state.feed.articles)

  // render pagination
  profileView.renderPageItems(state.feed.totalPages, state.feed.currentPage);
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
    renderHomePage();
  } else if (e.target.matches('#NewArticleLink, #NewArticleLink *')) {
    navbarView.toggleHighlightNavLink(state.currentPage, 'New Article');
    state.currentPage = 'New Article';

    // render new article page (form)
    articleView.renderNewArticleForm();

  } else if (e.target.matches('#SettingLink, #SettingLink *')) {
    navbarView.toggleHighlightNavLink(state.currentPage, 'Setting');
    state.currentPage = 'Setting';

    // get current user
    const currentUser = await state.user.getCurrentUser();

    // render the setting for profile form
    profileView.renderSettingForm(currentUser);
  } else if (e.target.matches('#UsernameLink, #UsernameLink *')) {
    navbarView.toggleHighlightNavLink(state.currentPage, 'User');
    state.currentPage = 'User';
    state.activeProfileHeaderIndex = 0;

    // call api to get user profile
    const res = await state.user.getProfile(state.user.userData.username, state.user.getToken());

    // prepare article
    if (state.user.isLoggedIn) {
      await state.feed.getArticlesWithToken(state.user.getToken(), '', state.user.currentProfile.username, '', 1);
    } else {
      await state.feed.getArticles('', state.user.currentProfile.username, '', 1);
    }

    // render page
    renderProfile();
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
  articleView.renderArticleDetailPage(state.user.userData, state.feed.currentArticle, state.comment.comments);
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
  } else if (e.target.id === 'SignInLinkInPage') { // handle clicking on sign in link
    navbarView.toggleHighlightNavLink(state.currentPage, 'Sign In');
    state.currentPage = 'Sign In';

    containerView.clearContentPage();

    // render signin form
    authenicateFormView.renderSignInForm();
  } else if (e.target.id === 'SignUpLinkInPage') { // handle clicking on sign up link
    navbarView.toggleHighlightNavLink(state.currentPage, 'Sign Up');
    state.currentPage = 'Sign Up';

    containerView.clearContentPage();

    // render signup form
    authenicateFormView.renderSignUpForm();
  } else if (e.target.classList.contains('yourfeedheader')) {
    state.tag.setTag('');
    state.activeHeaderIndex = 0;
    if (state.tagHeaders.length > 2) state.tagHeaders.splice(2, 1);

    loadingView.renderLoading();
    await state.feed.getFeeds(state.user.getToken(), 1);

    renderHomePage();
  } else if (e.target.matches('.page-item, .page-item *')) { // clicking on page item
    const page = parseInt(e.target.closest('.page-item').dataset.gotopage, 10);

    if (state.currentPage === 'Home') {
      loadingView.renderLoading();
      if (state.user.isLoggedIn) {
        await state.feed.getArticlesWithToken(state.user.getToken(), state.tag.tag, '', '', page);
        await state.tag.getTags();
      } else {
        await state.feed.getArticles(state.tag.tag, '', '', page);
        await state.tag.getTags();
      }

      renderHomePage();
    } else if (state.currentPage === 'Profile Page') {
      if (state.user.isLoggedIn && state.activeProfileHeaderIndex == 0) {
        await state.feed.getArticlesWithToken(state.user.getToken(), '', '', '', page);
      } else if (state.user.isLoggedIn && state.activeProfileHeaderIndex == 1) {
        await state.feed.getArticles(state.tag.tag, '', '', page);
      } else if (!state.user.isLoggedIn && state.activeProfileHeaderIndex == 0) {

      } else if (!state.user.isLoggedIn && state.activeProfileHeaderIndex == 1) {

      }
    }

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
  } else if (e.target.id === 'create-article-button') { // handle submit new article button
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
      renderArticleDetailPage();
    } else {
      renderErrors(res);
    }
  } else if (e.target.matches('.preview-link, .preview-link *')) {
    const articleSlug = e.target.closest('.preview-link').dataset.articledetail;
    await state.feed.getArticle(articleSlug, state.user.getToken());
    await state.comment.fetchComments(articleSlug, state.user.getToken());
    navbarView.toggleHighlightNavLink(state.currentPage);
    state.currentPage = 'Article Detail Page';
    renderArticleDetailPage();
  } else if (e.target.matches('.favorite-feed-button, .favorite-feed-button *')) { // handle like / dislike feed from the home page
    // check isLoggedIn
    if (state.user.isLoggedIn) {
      // get the action (like / dislike)
      const type = e.target.closest('.favorite-feed-button').classList.contains('btn-primary') ? 'dislike' : 'like';
      const articleSlug = e.target.closest('.favorite-feed-button').dataset.lovearticle;

      // call api to take the action
      const feed = await state.feed.favoriteFeed(type, articleSlug, state.user.getToken());

      // re-render the item
      feedsView.rerenderArticle(feed, state.currentPage);
    } else {
      navbarView.toggleHighlightNavLink(state.currentPage, 'Sign In');
      state.currentPage = 'Sign In';

      containerView.clearContentPage();

      // render Sign In form
      authenicateFormView.renderSignInForm();
    }
  } else if (e.target.id === 'UpdateSettingButton') { // handle update setting button (submit update setting form)
    e.preventDefault();

    // call api to update user data
    const res = await state.user.updateUser(
      getInputFieldsSettingForm().image,
      getInputFieldsSettingForm().username,
      getInputFieldsSettingForm().bio,
      getInputFieldsSettingForm().email,
      getInputFieldsSettingForm().password,
    )
    if (res === 'Update successfully') {
      // render profile page
      // DO LATER
      console.log(res);
    } else {
      renderErrors(res)
    }
  } else if (e.target.id === 'PostCommentButton') { // handle post new comment
    e.preventDefault();
    // get the body of comment
    // call api to add the coomment
    const res = await state.comment.addComment(state.feed.currentArticle.slug, getInputFieldCommentBody().body, state.user.getToken());

    // handle response
    if (res.id) { // only render item if comment not null (retuen comment.id)
      // clear error container
      clearErrorsContainer();
      clearInputFieldCommentBody();

      // render new comment
      articleView.renderNewComment(res, state.user.userData);
    } else {
      renderErrors(res);
    }
  } else if (e.target.matches('.delete-comment-button, .delete-comment-button *')) { // handle delete comment button (icon)
    // get the comment ID
    const commentId = e.target.closest('.delete-comment-button').dataset.commentid;

    // call API to delete the comment
    const res = await state.comment.deleteComment(state.user.getToken(), state.feed.currentArticle.slug, commentId);
    if (res === 'Success') {
      // remove the deleted comment
      articleView.deleteComment(commentId);
    } else {
      alert('Something went wrong while deleting the comment')
    }
  } else if (e.target.matches('.follow-user-button, .follow-user-button *')) { // handle follow user button
    if (state.user.isLoggedIn) {
      // get the action (follow / unfollow)
      const type = e.target.closest('.follow-user-button').classList.contains('btn-secondary') ? 'unfollow' : 'follow';
      const username = e.target.closest('.follow-user-button').dataset.followuser;

      // call api to take the action
      const profile = await state.user.followUser(type, username);

      if (profile.username) {
        // re-render the follow user button
        rerenderFollowButton(profile);
      }
    } else {
      navbarView.toggleHighlightNavLink(state.currentPage, 'Sign In');
      state.currentPage = 'Sign In';

      containerView.clearContentPage();

      // render Sign In form
      authenicateFormView.renderSignInForm();
    }
  } else if (e.target.matches('.edit-article-button, .edit-article-button *')) { // handle edit article button
    // highlight the new article link in navbar
    navbarView.toggleHighlightNavLink(state.currentPage);
    state.currentPage = 'New Article';

    // render new article page (form)
    articleView.renderNewArticleForm(state.feed.currentArticle);
  } else if (e.target.id === 'update-article-button') { // handle edit article submit button
    // call api to submit the updated article
    const res = await state.feed.updateFeed(
      state.user.token,
      state.feed.currentArticle.slug,
      getInputFieldsNewArticleForm().title.trim().toString() ? getInputFieldsNewArticleForm().title.trim().toString() : state.feed.currentArticle.title,
      getInputFieldsNewArticleForm().description.trim().toString() ? getInputFieldsNewArticleForm().description.trim().toString() : state.feed.currentArticle.description,
      getInputFieldsNewArticleForm().body.trim().toString() ? getInputFieldsNewArticleForm().body.trim().toString() : state.feed.currentArticle.body,
      getInputFieldsNewArticleForm().tagList.toString()
    );

    // handle error
    if (state.feed.currentArticle.slug) {
      renderArticleDetailPage();
    } else {
      renderErrors(res);
    }
  } else if (e.target.matches('.delete-article-button, .delete-article-button *')) { // handle when user clicking on delete article
    // call API to delete the article
    const res = await state.feed.deleteFeed(state.user.getToken(), state.feed.currentArticle.slug);
    if (res === 'Delete article successfully') {
      // render the home page after deleting article successfully
      navbarView.toggleHighlightNavLink(state.currentPage, 'Home');
      state.currentPage = 'Home';

      loadingView.renderLoading();
      await state.feed.getArticlesWithToken(state.user.getToken(), '', '', '', 1);
      renderHomePage();
    } else {
      alert('Something went wrong when trying to delete the article');
    }
  } else if (e.target.matches('.author-link, .author-link *')) { // handle when user clicking on author link
    // get the username
    const username = e.target.closest('.author-link').dataset.author;

    // call api to get user profile
    const res = await state.user.getProfile(username, state.user.getToken());

    // prepare article
    if (state.user.isLoggedIn) {
      await state.feed.getArticlesWithToken(state.user.getToken(), '', state.user.currentProfile.username, '', 1);
    } else {
      await state.feed.getArticles('', state.user.currentProfile.username, '', 1);
    }

    // render profile page
    navbarView.toggleHighlightNavLink(state.currentPage);
    state.currentPage = 'Profile Page';

    await renderProfile();
  }
});
