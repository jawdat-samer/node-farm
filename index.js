const fs = require('fs');
const http = require('http');
const url = require('url');

const slugify = require('slugify');

const replaceTemplate = require('./modules/replaceTemplate');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
// console.log(slugs);

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  if (pathname === '/' || pathname === '/overview') {
    const cardsHtml = dataObj.map((el) => replaceTemplate(tempCard, el)).join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

    res.writeHead(200, { 'Content-type': 'text/html' });
    res.end(output);
  } else if (pathname === '/product') {
    const [product] = dataObj.filter((el) => {
      if (el.id === Number(query.id)) return el;
    });
    const output = replaceTemplate(tempProduct, product);

    res.writeHead(200, { 'Content-type': 'text/html' });
    res.end(output);
  } else if (pathname === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data);
  } else {
    res.writeHead(404, { 'Content-type': 'text/html' });
    res.end('<h1>Page not found!</h1>');
  }
});

server.listen(8000, () => {
  console.log('Server started on http://127.0.0.1:8000');
});
