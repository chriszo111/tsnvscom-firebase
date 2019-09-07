const functions = require('firebase-functions');
const app = require('express')();

const admin = require('firebase-admin');
admin.initializeApp();
const firestore = admin.firestore();

const cors = require('cors')({origin: true});
app.use(cors);

/** Routes */

app.get('/say/hello', (req, res) => {
  const currentUserIdToken = req.idToken;

  if (currentUserIdToken) {
    admin.auth().verifyIdToken(currentUserIdToken)
    .then((decodedToken) => {
      res.status(200).json(
        {
          uid: decodedToken.uid,
          isActive: true, 
          status: 'online',
          hasAccess: true,
          message: "Hello there, Friend!"
        }
      )
    })
    .catch((err) => {
      res.status(401).json(
        {
          isActive: true, 
          status: 'online',
          hasAccess: false,
          message: "Hello there, Sailor!",
          error: err
        }
      )
    })
  } else {
    console.log(req);
    res.status(403).send('You do not have permission to access this endpoint')
  }
});

app.get('/users/:id', (req, res) => {
  
});

exports.api = functions.https.onRequest(app);