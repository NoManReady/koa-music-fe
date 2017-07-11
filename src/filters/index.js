export default {
  timeFormat: (value, fmt = 'yyyy-MM-dd') => {
    if (!value) {
      return ''
    }
    value = value.replace('-', '/')
    let date = new Date(value);
    let o = {
      "M+": date.getMonth() + 1,
      "d+": date.getDate(),
      "h+": date.getHours(),
      "m+": date.getMinutes(),
      "s+": date.getSeconds(),
      "q+": Math.floor((date.getMonth() + 3) / 3),
      "S": date.getMilliseconds(),
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  },
  formatSecond: (value) => {
    let hour = parseInt(value / (1000 * 60 * 60));
    let minute = parseInt((value - hour * 1000 * 60 * 60) / 1000 / 60);
    let second = parseInt((value - hour * 1000 * 60 * 60 - minute * 60 * 1000) / 1000);
    hour = ('00' + hour).substr(hour.toString().length);
    minute = ('00' + minute).substr(minute.toString().length);
    second = ('00' + second).substr(second.toString().length);
    return `${hour}:${minute}:${second}`
  },
  parseInt: (value) => {
    return Math.floor(value);
  }
};
