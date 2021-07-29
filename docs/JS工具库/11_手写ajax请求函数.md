# 7.手写ajax请求函数

## 7.1.API 相关

- 语法：
  - axios(options)
    - 参数配置对象：url, method, params与data
    - 返回值为：promise对象
  - get(url, options)
  - post(url, data, options)
  - put(url, data, options)
  - delete(url, options)
- 功能：使用xhr发送ajax请求的工具函数，与axios库功能类似

## 7.2. 实现整体流程

1. 函数的参数为一个配置对象

   {
   	url: '',   // 请求地址
   	method: '',   // 请求方式GET/POST/PUT/DELETE
   	params: {},  // GET/DELETE请求的query参数
   	data: {}, // POST或DELETE请求的请求体参数 
   }

2. 返回值: 函数的返回值为promise, 成功的结果为response, 失败的结果为error

3. 能处理多种类型的请求: GET/POST/PUT/DELETE

4. 响应json数据自动解析为js的对象/数组

## 7.3. 编码实现

- `src/axios/index.js`

```js
/* 发送任意类型请求的函数 */
function axios({
  url,
  method='GET',
  params={},
  data={}
}) {
  // 返回一个promise对象
  return new Promise((resolve, reject) => {

    // 处理method(转大写)
    method = method.toUpperCase()
    
    // 处理query参数(拼接到url上)   id=1&xxx=abc
    /* { id: 1, xxx: 'abc'} */
    let queryString = ''
    Object.keys(params).forEach(key => {
      queryString += `${key}=${params[key]}&`
    })
    if (queryString) { // id=1&xxx=abc&
      // 去除最后的&
      queryString = queryString.substring(0, queryString.length-1)
      // 接到url
      url += '?' + queryString
    }


    // 1. 执行异步ajax请求
    // 创建xhr对象
    const request = new XMLHttpRequest()
    // 打开连接(初始化请求, 没有请求)
    request.open(method, url, true)
    
    // 发送请求
    if (method==='GET') {
      request.send()
    } else if (method==='POST' || method==='PUT' || method==='DELETE'){
      // 告诉服务器请求体的格式是json
      request.setRequestHeader('Content-Type', 'application/json;charset=utf-8') 
       // 发送json格式请求体参数
      request.send(JSON.stringify(data))
    }
    
    // 绑定状态改变的监听
    request.onreadystatechange = function () {
      // 如果请求没有完成, 直接结束
      if (request.readyState!==4) {
        return
      }
      // 如果响应状态码在[200, 300)之间代表成功, 否则失败
      const {status, statusText} = request
      // 2.1. 如果请求成功了, 调用resolve()
      if (status>=200 && status<=299) {
        // 准备结果数据对象response
        const response = {
          data: JSON.parse(request.response),
          status,
          statusText
        }
        resolve(response)
      } else { // 2.2. 如果请求失败了, 调用reject()
        reject(new Error('request error status is ' + status))
      }
    }
  })
}

/* 发送特定请求的静态方法 */
axios.get = function (url, options) {
  return axios(Object.assign(options, {url, method: 'GET'}))
}
axios.delete = function (url, options) {
  return axios(Object.assign(options, {url, method: 'DELETE'}))
}
axios.post = function (url, data, options) {
  return axios(Object.assign(options, {url, data, method: 'POST'}))
}
axios.put = function (url, data, options) {
  return axios(Object.assign(options, {url, data, method: 'PUT'}))
}

export default axios
```

## 7.4.测试

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>手写ajax请求函数</title>
</head>
<body>
  <button onclick="testGet()">发送GET请求</button><br>
  <button onclick="testPost()">发送POST请求</button><br>
  <button onclick="testPut()">发送PUT请求</button><br>
  <button onclick="testDelete()">发送Delete请求</button><br>
    
<script src="../dist/atguigu-utils.js"></script>
<script>
  const { axios } = aUtils

  /* 1. GET请求: 从服务器端获取数据*/
  function testGet() {
    axios({
      // url: 'http://localhost:3000/posts',
      url: 'http://localhost:3000/posts2',
      method: 'GET',
      params: {
        id: 1,
        xxx: 'abc'
      }
    })
    // axios.get('http://localhost:3000/posts', {params: {id: 1}})
    .then(
      response => {
        console.log(response)
      },
      error => {
        alert(error.message)
      }
    )
  }

  /* 2. POST请求: 服务器端保存数据*/
  function testPost() {
    axios({
      url: 'http://localhost:3000/posts',
      method: 'POST',
      data: {
        "title": "json-server---", 
        "author": "typicode---"
      }
    })
    // axios.post('http://localhost:3000/posts', {title: 'aaa', author: 'bbb'})
    .then(
      response => {
        console.log(response)
      },
      error => {
        alert(error.message)
      }
    )
  }

  /* 3. PUT请求: 服务器端更新数据*/
  function testPut() {
    axios({
      url: 'http://localhost:3000/posts/1',
      method: 'put',
      data: {
        "title": "json-server+++", 
        "author": "typicode+++"
      }
    })
    // axios.put('http://localhost:3000/posts/1', {title: 'aaa222', author: 'bbb222'})
    .then(
      response => {
        console.log(response)
      },
      error => {
        alert(error.message)
      }
    )
  }

  /* 2. DELETE请求: 服务器端删除数据*/
  function testDelete() {
    axios({
      url: 'http://localhost:3000/posts/2',
      method: 'delete'
    })
    // axios.delete('http://localhost:3000/posts/2')
    .then(
      response => {
        console.log(response)
      },
      error => {
        alert(error.message)
      }
    )
  }
</script>
</body>
</html>
```

