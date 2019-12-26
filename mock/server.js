//服务端代码
let http = require('http');
let fs = require('fs');
let url = require('url');


//获取热门图书数据
function readBook(cb) {
  fs.readFile('./book.json', 'utf8', function (err, data) {
    if (err || data.length == 0) {
      cb([]);
    } else {
      cb(JSON.parse(data));   //将内容转化为对象
    }
  })
}

function writeBook(data, cb) {   //写入内容
  fs.writeFile('./book.json', JSON.stringify(data), cb);
}


let pageSize = 5;  //每页显示5个

//获取轮播图数据/sliders
let sliders = require('./sliders.js');
http.createServer((req, res) => {

  //解决跨域问题
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("X-Powered-By", ' 3.2.1')
  if (req.method == "OPTIONS") {
    return res.end("200");
  }
  /*让options请求快速返回*/

  let {pathname, query} = url.parse(req.url, true);
  if (pathname === '/sliders') {
    res.setHeader('Content-Type', 'application/json;charset=utf8')
    return res.end(JSON.stringify(sliders))
  }


  if (pathname === '/hot') {
    readBook(function (books) {
      let hot = books.reverse().slice(0, 6);
      res.setHeader('Content-Type', 'application/json;charset=utf8');
      //设置加载延迟
      setTimeout(() => {
        res.end(JSON.stringify(hot));
      }, 500);

    });
    return
  }


  //对图书数据进行查询下拉(就是分页查询数据)
  if (pathname === '/page') {
    let offset = parseInt(query.offset) || 0;
    //拿到前端传递的值
    readBook(function (books) {
      let result = books.reverse().slice(offset, pageSize+offset);
      let hasMore = true;
      if (books.length <= pageSize + offset) {
        hasMore = false;
      }
      res.setHeader('Content-Type', 'application/json;charset=utf8');
      res.end(JSON.stringify({hasMore,books:result}));
    });
    return;
  }

  if (pathname === '/book') {  //对书的增删改查
    let id = parseInt(query.id);
    switch (req.method) {
      case 'GET':
        if (id) {//查询单个图书
          readBook(function (books) {
            let book = books.find(item => item.id === id);
            if (!book) {
              book = {};  //如果没有数据则返回undifined
            }
            res.setHeader('Content-Type', 'application/json;charset=utf8');
            res.end(JSON.stringify(book));
          });

        } else {//获取所有图书
          readBook(function (books) {
            res.setHeader('Content-Type', 'application/json;charset=utf8');
            res.end(JSON.stringify(books));
          })
        }
        break;
      case 'POST':
        let str = '';
        req.on('data', chunk => {
          str += chunk
        });
        req.on('end', () => {
          let book = JSON.parse(str);
          readBook(function (books) {
            book.id = books.length ? books[books.length - 1].id + 1 : 1;
            books.push(book);
            writeBook(books, function () {
              res.end(JSON.stringify(book));
            });
          });
        });
        break;
      case 'PUT':
        if (id) {//获取当前修改的ID
          let str = '';
          req.on('data', (chunk) => {
            str += chunk;
          });
          req.on('end', () => {
            let book = JSON.parse(str);
            readBook(function (books) {
              books = books.map(item => {
                if (item.id === id) {//找到ID相同的修改返回
                  return book;
                }
                return item;  //ID不同的正常返回其他的数据
              });
              writeBook(books, function () {  //将数据写回JSON文件中
                res.end(JSON.stringify(book));
              })
            });
          });
        }
        break;
      case 'DELETE':
        readBook(function (books) {
          books = books.filter(item => item.id !== id);
          writeBook(books, function () {
            res.end(JSON.stringify({}));   //删除成功返回空对象
          });
        });
        break;
    }
    return
  }



  //运行静态文件读取一个路径
  fs.stat('.' + pathname,function (err,stats) {
    if(err){
      res.statusCode = 404;
      res.end('NOT FOUND');
    }else{
      if(stats.isDirectory()){
        let path = require('path').join('.' + pathname,'./index.html');
        fs.createReadStream(path).pipe(res);
      }else{
        fs.createReadStream('.' + pathname).pipe(res);
      }

    }
  })


}).listen(3000);
