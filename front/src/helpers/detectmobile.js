const isMobile = {
  Android: function Android(userAgent) {
    return !userAgent || userAgent.match(/Android/i) == null ? false : true
  },
  BlackBerry: function BlackBerry(userAgent) {
    return !userAgent || userAgent.match(/BlackBerry/i) == null ? false : true
  },
  iOS: function iOS(userAgent) {
    return !userAgent || userAgent.match(/iPhone|iPad|iPod/i) == null ? false : true
  },
  Opera: function Opera(userAgent) {
    return !userAgent || userAgent.match(/Opera Mini/i) == null ? false : true
  },
  Windows: function Windows(userAgent) {
    return !userAgent || userAgent.match(/IEMobile/i) == null ? false : true
  },
  Googlebot: function (userAgent) {
    return !userAgent || userAgent.match(/Googlebot/i) == null ? false : true
  },
  Amp: function (userAgent) {
    if (typeof userAgent === 'undefined') {
      return false
    } else {
      if (typeof window !== 'undefined') {
        if (window.location.href.indexOf('/amp/') > -1) {
          return true
        }
      }
      return userAgent == 'Amp' ? true : false
    }
  },
  any: function (userAgent) {
    if (isMobile.Android(userAgent) || isMobile.BlackBerry(userAgent) || isMobile.iOS(userAgent) || isMobile.Opera(userAgent) || isMobile.Windows(userAgent)) {
      return true
    }
    return false
  },
}
export default isMobile
