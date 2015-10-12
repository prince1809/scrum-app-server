exports.addRoutes = function(app, config){
  //This route deals enables HTML5Mode by missing files to the index.html
  app.all('/*', function(req,res) {
    //Just send the index.html for the other files to support HTML5Mode
    res.sendfile('index.html', { root: config.server.distFolder});
  });
};
