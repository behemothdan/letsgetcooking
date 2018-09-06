# GRANDstack Starter - GraphQL API


## Quick Start

Install dependencies:

```
npm install
```

Start the GraphQL service:

```
npm start
```

This will start the GraphQL service (by default on localhost:4000) where you can issue GraphQL requests or access GraphQL Playground in the browser:

![GraphQL Playground](img/graphql-playground.png)

## Configure

Set your Neo4j connection string and credentials in `.env`. For example:

*.env*

```
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=letmein
```

Sample User Data Shape:

{accessToken: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", idToken: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", idTokenPayload: {…}, appState: null, refreshToken: null, …}
accessToken: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
appState: null
expiresIn: 7200
idToken: "eyJxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
idTokenPayload:
at_hash: "ogsrdgUyxlEWqqbfJTqZwg"
aud: "0gFgBNlFCzqTnBhLrK9b1XISlvb6wGrO"
email: "gray.daniel@gmail.com"
email_verified: true
exp: 1536253986
family_name: "Gray"
gender: "male"
given_name: "Daniel"
iat: 1xxxxxxxxxxxxxx6
iss: "https://letsgetcooking.auth0.com/"
locale: "en"
name: "Daniel Gray"
nickname: "gray.daniel"
nonce: "XRtmagP4YVY1w7rJBbGNcdNZ7LpXit56"
picture: "https://lh6.googleusercontent.com/-h695sfcceSE/AAAAAAAAAAI/AAAAAAAAF1Y/b03905L_QFU/photo.jpg"
sub: "google-oauth2|114xxxxxxxxxxxxxxxxxxx59"
updated_at: "2018-09-06T07:13:02.432Z"
__proto__: Object
refreshToken: null
scope: "openid profile email"
state: "1Btv7bVEr5hq0pzPXdheizajDwOH~CnL"
tokenType: "Bearer"
__proto__: