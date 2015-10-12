// JSON Vulnerability protection

module.exports = function(req,res, next){
  var _send = res.send;
  res.send = function(body) {
    var contentType = res.getHeader('content-Type');
    if( contentType && contentType.indexOf('application/json') !== -1){
      if(2 == arguments.length) {
        if( 'number' !== typeof body && 'number' === typeof arguments[1]){
          this.statusCode = arguments[1];
        }else{
          
        }
      }
    }
  }
}
