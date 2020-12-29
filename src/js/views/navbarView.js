import { elements } from './base';

const navItems = new Map([
  ['Home', 'HomeLink'],
  ['New Article', 'NewArticleLink'],
  ['Setting', 'SettingLink'],
  ['User', 'UsernameLink'],
  ['Sign In', 'SignInLink'],
  ['Sign Up', 'SignUpLink']
]);

export const toggleHighlightNavLink = (oldPage, currentPage = "") => {
  if (document.querySelector(`#${navItems.get(oldPage)} a`)) {
    document.querySelector(`#${navItems.get(oldPage)} a`).classList.remove('active');
  }
  if (currentPage && document.querySelector(`#${navItems.get(currentPage)} a`)) {
    document.querySelector(`#${navItems.get(currentPage)} a`).classList.add('active');
  }
}

export const clearNavbar = () => {
  elements.navbarContainer.innerHTML = '';
}

export const renderLoggedInUserNavbar = (username, activeItem = 'Home') => {
  clearNavbar();

  const markup = `
    <div class="container">
      <a class="navbar-brand" href="index.html">conduit</a>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item" id="HomeLink">
          <!-- Add "active" class when you're on that page" -->
          <a class="nav-link" href="javascript:void(0)">Home</a>
        </li>
        <li class="nav-item" id="NewArticleLink">
          <a class="nav-link" href="javascript:void(0)">
            <i class="ion-compose"></i>&nbsp;New Article
          </a>
        </li>
        <li class="nav-item" id="SettingLink">
          <a class="nav-link" href="javascript:void(0)">
            <i class="ion-gear-a"></i>&nbsp;Settings
          </a>
        </li>
        <li class="nav-item author-link" data-author="${username}" id="UsernameLink">
          <a
            class="nav-link"
            href="javascript:void(0)"
          >
              ${username}
          </a>
        </li>
      </ul>
    </div>
  `;
  elements.navbarContainer.insertAdjacentHTML('afterbegin', markup);

  toggleHighlightNavLink(activeItem, activeItem);
}

export const renderNavbar = (activeItem = 'Home') => {
  clearNavbar();
  const markup = `
    <div class="container">
      <a class="navbar-brand" href="index.html">conduit</a>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item" id="HomeLink">
          <!-- Add "active" class when you're on that page" -->
          <a class="nav-link" href="javascript:void(0)">Home</a>
        </li>
        <li class="nav-item" id="SignInLink">
          <a class="nav-link" href="javascript:void(0)">Sign in</a>
        </li>
        <li class="nav-item" id="SignUpLink">
          <a class="nav-link" href="javascript:void(0)">Sign up</a>
        </li>
      </ul>
    </div>
  `;
  elements.navbarContainer.insertAdjacentHTML('afterbegin', markup);

  toggleHighlightNavLink(activeItem, activeItem);
}
