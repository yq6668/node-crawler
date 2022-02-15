const Crawler = require('crawler');
const fs = require('fs')


const c = new Crawler({
    //每次请求爬取的时间间隔
    rateLimit: 2000,
    //最大连接数量
    maxConnections: 10,
    preRequest: (options, done) => {
        //这里的options将会传递给request模块
        console.log("请求预处理");
        //当done方法调用的时候，请求将被发送
        done();
    },
    //爬取成功的回调函数（通用）
    callback: (error, res, done) => {
        if (error) {
            console.log(error);
        } else {
            var list = []
            const $ = res.$;
            const searchResult = $('.ke-zeroborder>tbody>tr');
            searchResult.each((idx, item) => {
                var med = {
                    id:$(item).find("td").eq(0).text().replace(/\s/g,""),
                    name:$(item).find("td").eq(1).text().replace(/\s/g,""),
                    specification:$(item).find("td").eq(2).text().replace(/\s/g,""),
                    unit:$(item).find("td").eq(3).text().replace(/\s/g,""),
                    place:$(item).find("td").eq(4).text().replace(/\s/g,""),
                    price:$(item).find("td").eq(5).text().replace(/\s/g,"")
                }
                list.push(med)
            })
            console.log(list);
            fs.createWriteStream("data\\list.txt").write(JSON.stringify(list));
        }
        done()
    }
})

c.queue('http://www.huaibeihosp.com/page/index/cid/276')