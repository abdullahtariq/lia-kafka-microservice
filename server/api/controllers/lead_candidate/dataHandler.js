module.exports = {
    dataHandler : function(messageSet, topic, partition) {
      messageSet.forEach(function (m) {
          console.log(topic, partition, m.offset, m.message.value.toString('utf8'));
      });
      
    }

}
