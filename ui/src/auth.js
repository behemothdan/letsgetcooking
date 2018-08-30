import auth0 from 'auth0-js';
import history from './history';

export default class Auth {
    auth0 = new auth0.WebAuth({
      domain: 'letsgetcooking.auth0.com',
      clientID: '0gFgBNlFCzqTnBhLrK9b1XISlvb6wGrO', // This will obviously be changed when it comes time to deploy.
      redirectUri: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/callback' : 'http://localhost:3000/callback',
      audience: 'https://letsgetcooking.auth0.com/userinfo',
      responseType: 'token id_token',
      scope: 'openid'
    });

    login = () => {
      this.auth0.authorize();
    }

    handleAuthentication = () => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          history.replace('/home');
        } else if (err) {
          history.replace('/home');
          console.log(err);
        }
      });
    }

    // Sets user details in localStorage
    setSession = (authResult) => {
      let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);
      history.replace('/');
    }

    // removes user details from localStorage
    logout = () => {
      // Clear access token and ID token from local storage
      localStorage.removeItem('access_token');
      localStorage.removeItem('id_token');
      localStorage.removeItem('expires_at');
      history.replace('/');
    }

    isAuthenticated = () => {
      let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
      return new Date().getTime() < expiresAt;
    }
  }