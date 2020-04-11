
var timeformatter = d => {
    var date = d.toISOString().split("T")[0];
    var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    return date + " " + time;
  };

module.exports = timeformatter