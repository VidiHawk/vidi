const requestPromise = require("request-promise");

let request = {};

request.POST = (data, callback) => {
  let {body, headers, url, params} = data;

  if(!headers){
    headers = {
      'Content-Type': 'application/json',
    };
  }

  let options = {
    url,
    method: 'POST',
    qs: params,
    headers,
    body,
    json: true
  };
  console.log(`[REQUEST:POST]: url: ${url} | body: ${JSON.stringify(body)}`);
  requestPromise(options).then((result) => {
    return callback(null, result);
  }).catch(e => {
    if(Object.keys(e).length){
      return callback(e, null)
    }
  })
}

request.PUT = (data, callback) => {
  let {body, headers, url, params} = data;

  if(!headers){
    headers = {
      'Content-Type': 'application/json',
    };
  }

  let options = {
    url,
    method: 'PUT',
    qs: params,
    headers,
    body,
    json: true
  };
  console.log(`[REQUEST:PUT]: url: ${url} | body: ${JSON.stringify(body)}`);
  requestPromise(options).then((result) => {
    return callback(null, result);
  }).catch(e => {
    if(Object.keys(e).length){
      return callback(e, null)
    }
  })
}

request.GET = (data, callback) => {
  let {headers, url, params} = data;

  if(!headers){
    headers = {
      'Content-Type': 'application/json',
    };
  }
  let options = {
    url,
    qs: params,
    method: 'GET',
    headers,
    json: true
  };
  console.log(`[REQUEST:GET]: url: ${url} | params: ${JSON.stringify(params)}`);
  requestPromise(options).then((result) => {
    return callback(null, result);
  })
}

request.FORMDATA = (data, callback) => {
  let {file, headers, url, params} = data;

  if(!file || !url) return callback("invalid/missing params", null);

  if(!headers){
    headers = {
      'content-type': 'multipart/form-data',
    };
  }

  const options = {
    method: 'POST',
    url,
    formData: {
      file
      // file: {
      //   value: fs.createReadStream('test/test.jpg'),
      //   options: {
      //     filename: 'test.jpg',
      //     contentType: 'image/jpg'
      //   }
      // }
    },
    qs: params,
    headers,
    json: true,
  };
  console.log(`[REQUEST:FORMDATA]: url: ${url}`);
  requestPromise(options).then((result) => {
    return callback(null, result);
  })
}

module.exports = request;