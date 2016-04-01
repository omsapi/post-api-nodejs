function BusService(bus) {
    //bus.connect(options) - promise
    //bus.publish('topic-name', msg, callback) - execute only after connect promise is resolve
    //bus.subscribe('topic-name', 'channel-name', callback) execute only after connect promise is resolve

    //auto reconnect, RoundRobin, etc.
    this.bus = bus;
}

BusService.prototype.publishMsg1 = function (msg, callback) {
    this.bus.publish('topic-name', msg, function (err) {
        callback(err);
    });
};

BusService.prototype.subscribe1=function(callback){
  this.bus.subscribe('topic-name', 'channel-name', function(err, msg){
      //msg.touch();
      //msg.resume(30);
      //msg.finish();
      //msg.data;
      callback(err, msg);
  });
};