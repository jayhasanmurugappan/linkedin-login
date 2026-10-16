# linkedin-login

Public login and callback pages for a personal LinkedIn connector. These pages hold no secrets and no tokens.

- `index.html` starts the LinkedIn sign-in. The client ID is injected at deploy time from the `LINKEDIN_CLIENT_ID` repository secret.
- `callback.html` receives LinkedIn's one-time code and shows it for pasting into the token workflow, which lives in a separate private repo.

Redirect URL to register in the LinkedIn app:

```
https://jayhasanmurugappan.github.io/linkedin-login/callback.html
```
