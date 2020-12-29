This is the example application is a social blogging site (i.e. a Medium.com clone) called "Conduit". It uses a custom API for all requests, including authentication. You can view a live demo over at https://angular.realworld.io. This application was created using only Javascript without using any framework, with HTML and CSS from bootstraps CDN (see the `Mock Project Blog.docx` for more detail).

*General functionality:*

- Authenticate users via JWT (login/signup pages + logout button on settings page)
- CRU* users (sign up & settings page - no deleting required)
- CRUD Articles
- CR*D Comments on articles (no updating required)
- GET and display paginated lists of articles
- Favorite articles
- Follow other users

*HOW TO RUN*
- run `npm install` to resolve all dependencies
- run `npm run start` to start the app
- You're good to go.
