import { elements } from './base';

const signInMarkup = `
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <a href="#">Need an accountt?</a>
          </p>

          <ul class="error-messages">
            <!-- <li>That email is already taken</li> -->
          </ul>

          <form>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="text" placeholder="Email">
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="password" placeholder="Password">
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right" id="SignInButton">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
`;

const signUpMarkup = `
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <a href="#">Have an accountt?</a>
          </p>

          <ul class="error-messages">
            <!-- <li>That email is already taken</li> -->
          </ul>

          <form>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="text" placeholder="Username">
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="text" placeholder="Email">
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="password" placeholder="Password">
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right" id="SignUpButton">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
`;

export const renderSignInForm = () => {
  elements.contentContainer.insertAdjacentHTML('afterbegin', signInMarkup);
}

export const renderSignUpForm = () => {
  elements.contentContainer.insertAdjacentHTML('afterbegin', signUpMarkup);
}

// get input fields of login form
export const getInputsSignIn = () => {
  return {
    email: document.querySelector('[placeholder="Email"]').value,
    password: document.querySelector('[placeholder="Password"]').value
  }
}

// get input fields of signup form
export const getInputsSignUp = () => {
  return {
    username: document.querySelector('[placeholder="Username"]').value,
    email: document.querySelector('[placeholder="Email"]').value,
    password: document.querySelector('[placeholder="Password"]').value
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
