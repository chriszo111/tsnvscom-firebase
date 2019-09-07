process.env.NODE_ENV = 'development';
const settings = require('./config/server');
const app = {
  server: require('express')(),
  routes: require('./app.routes'),
}
const http = require('http').Server(app.server);
const io = require('socket.io')(http);

app.server.use(`/api/${settings.API_VERSION}`, app.routes);

io.on("connection", socket => {
    // let previousId;
    // const safeJoin = currentId => {
    //   socket.leave(previousId);
    //   socket.join(currentId);
    //   previousId = currentId;
    // };
  
    // socket.on("getDoc", docId => {
    //   safeJoin(docId);
    //   socket.emit("document", documents[docId]);
    // });
  
    // socket.on("addDoc", doc => {
    //   documents[doc.id] = doc;
    //   safeJoin(doc.id);
    //   io.emit("documents", Object.keys(documents));
    //   socket.emit("document", doc);
    // });
  
    // socket.on("editDoc", doc => {
    //   documents[doc.id] = doc;
    //   socket.to(doc.id).emit("document", doc);
    // });
  
    io.emit("io", 'hello world');
  });

  app.server.listen(settings.PORT, () => {
    console.log(`Server listening on port ${settings.PORT}`)
  });