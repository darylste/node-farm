const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');

// #################
// ##### Files #####
// #################
// ### Sync/Blocking Code ###
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);
// const textOut = `This is what we know about the avacado ${textIn}. \n Created on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File created!');

// ### Async/Non-Blocking Code ###
// fs.readFile('./txt/starts.txt', 'utf-8', (err, data1) => {
//     if(err) return console.log(err);
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         if(err) return console.log(err);
//         console.log(data2);
//         fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//     if(err) return console.log(err);
//             console.log(data3);
//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//                 console.log('File has been written');
//             })
//         });
//     });
// });

// console.log('Reading File...');

/*************** 
    SERVER
************** */
const tempOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const baseURL = `http://${req.headers.host}`;
    const requestUrl = new URL(req.url, baseURL);
    const pathName = requestUrl.pathname;
    const query = requestUrl.searchParams;

    if(pathName === '/' || pathName === '/overview') {
        res.writeHead(200, {'Content-type': 'text/html'});
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%productCards%}', cardsHtml);
        res.end(output);
    } else if (pathName === '/product') {
        res.writeHead(200, {'Content-type': 'text/html'})
        const product = dataObj[query.get('id')];
        const output = replaceTemplate(tempProduct, product)
        res.end(output);
    } else if (pathName === '/api') {
        res.end(data);
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
        });
        res.end('<h1>Page Not Found</h1>');
    }
 })

server.listen(8000, 'localhost', () => {
    console.log('Listening for requests on port 8000')
});

