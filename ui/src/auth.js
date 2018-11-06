import auth0 from 'auth0-js';
import history from './history';
import { client } from './client';
import { CREATE_USER, FIND_USER } from './graphql';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'letsgetcooking.auth0.com',
    clientID: '0gFgBNlFCzqTnBhLrK9b1XISlvb6wGrO', // This will obviously be changed when it comes time to deploy.
    redirectUri: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/callback' : 'http://localhost:3000/callback',
    audience: 'https://letsgetcooking.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid email profile'
  });

  login = () => {
    this.auth0.authorize();
  }

  // These do not appear to be redirecting properly. Need to see how to get users back to the homepage or wherever.
  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace('/');
      } else if (err) {
        history.replace('/');
      }
    });
  }

  setUserInfo = (authResult) => {
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('user_image', authResult.idTokenPayload.picture);
    localStorage.setItem('name', authResult.idTokenPayload.name);
    localStorage.setItem('id', authResult.idTokenPayload.sub)
    history.replace('/');
  }

  // Sets authorization information in localStorage
  // Creates new user if they are not in the database
  setSession = (authResult) => {
    client.query({
      variables: { id: authResult.idTokenPayload.sub },
      query: FIND_USER
    }).then(response => {
      if (response.data.UserById.length > 0) {
        this.setUserInfo(authResult);
      } else {
        client.mutate({
          variables: {
            name: authResult.idTokenPayload.name,
            id: authResult.idTokenPayload.sub,
            given_name: authResult.idTokenPayload.given_name,
            email: authResult.idTokenPayload.email
          },
          mutation: CREATE_USER
        }).then(this.setUserInfo(authResult))
          .catch((error) => {
            console.log(error)
          })
      }
    })
  }

  // Removes authorization information from localStorage
  logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user_image');
    history.replace('/');
  }

  isAuthenticated = () => {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}