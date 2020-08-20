var http = require('http')
var fs = require('fs')
var template = require('art-template')
var url = require('url')

var comments = [
  {
    name: '王朗',
    message: '……国安民乐，岂不美哉？',
    dataTime: '2020-8-16'
  },
  {
    name: '诸葛村夫',
    message: '粗鄙之语！',
    dataTime: '2020-8-16'
  },{
    name: '王司徒',
    message: '诸葛村夫，你敢！',
    dataTime: '2020-8-16'
  },
  {
    name: '诸葛亮',
    message: '住口！我从未见过有如此厚颜无耻之人！！',
    dataTime: '2020-8-16'
  }
]

http
  .createServer(function (req, res){

    var obj = url.parse(req.url,true)
    var myurl = obj.pathname //该路径不包含问好之后的那些内容

    if(myurl === '/'){
      fs.readFile('./view/index.html',function (err ,data) {
        if(err){
          return res.end('404 Not Found.')
        }
        var fuck = template.render(data.toString(),{
          comments: comments
        })
        res.end(fuck)
      })
    }else if(myurl.indexOf('/add-message') === 0){
      console.log('收到请求了', obj.query);

      var mes = obj.query
      var nowdate = new Date()
      mes.dataTime = nowdate.getFullYear()+'-'+nowdate.getMonth()+'-'+nowdate.getDate()
      comments.push(mes)
      res.statusCode = 302
      res.setHeader('Location','/')
      res.end()


    }else if (myurl.indexOf('/post') === 0) {
      fs.readFile('./view/post.html',function (err ,data) {
        if(err){
          return res.end('404 Not Found.')
        }
        res.end(data)
      })
    }else if (myurl.indexOf('/public/') === 0) {
      fs.readFile('.'+myurl,function (err ,data) {
        if(err){
          return res.end('404 Not Found.')
        }
        res.end(data)
      })
    }else {
      fs.readFile('./view/404.html',function (err, data) {
        if(err){
          return res.end('404 Not Found.')
        }
        res.end(data)
      })
    }
  })
  .listen(3000, function () {
    console.log('成功启动');
  })