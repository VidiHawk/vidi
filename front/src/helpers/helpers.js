export function createUrl(url) {
  return url
}

export function isElementInViewport(el) {
  var rect = el.getBoundingClientRect()

  return (
    rect.bottom > 0 &&
    rect.right > 0 &&
    rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
    rect.top < (window.innerHeight || document.documentElement.clientHeight)
  )
}

export function getCustomJS(code) {
  if (!code) {
    return ''
  }
  let script = /<script>(.*)<\/script>/gm.exec(code)
  return script && script[1] ? script[1] : ''
}

export function formatDate(date) {
  date = new Date(parseInt(date))
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

export function stripTags(html, stripTo){
	stripTo= stripTo | 0;
	html = html.replace(/<(?:.|\n)*?>/gm, '');
	if(stripTo != 0){
		if(html.length > stripTo){
			html = html.substr(0, stripTo) + '...';
		}
    }
    html = html.replace(/(\r\n|\n|\r)/gm, " ");
	return html;
}
