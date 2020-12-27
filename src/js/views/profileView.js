import { elements } from './base';
import { clearContentPage } from './containerView';

export const renderSettingForm = user => {
  clearContentPage();
  const markup = `
    <div class="settings-page">
      <div class="container page">
        <div class="row">

          <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">Your Settings</h1>

            <ul class="error-messages">
              <!-- <li>That email is already taken</li> -->
            </ul>

            <form>
              <fieldset>
                <fieldset class="form-group">
                  <input class="form-control" type="text" placeholder="URL of profile picture" value="${user.image ? user.image : ''}">
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="text" placeholder="Your Name" value="${user.username}">
                </fieldset>
                <fieldset class="form-group">
                  <textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you" value="${user.bio}"></textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="text" placeholder="Email" value="${user.email}">
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="password" placeholder="Password" value="${user.password}">
                </fieldset>
                <button class="btn btn-lg btn-primary pull-xs-right" id="UpdateSettingButton">
                  Update Settings
                </button>
              </fieldset>
            </form>
            <hr>
            <button class="btn btn-outline-danger" id="LogoutButton">
              Or click here to logout.
            </button>
          </div>

        </div>
      </div>
    </div>
  `;

  elements.contentContainer.insertAdjacentHTML('afterbegin', markup);
}
