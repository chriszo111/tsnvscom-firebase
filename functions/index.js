const functions = require('firebase-functions');
const app = require('express')();

const cors = require('cors')({origin: true});
app.use(cors);

app.get('/say/hello', (req, res) => {
  // Return success response
  res.status(200).json(
    {
      isActive: true, 
      status: 'online', 
      message: "Hello there, Sailor!"
    }
  )
});

exports.api = functions.https.onRequest(app);