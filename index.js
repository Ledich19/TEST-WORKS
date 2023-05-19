'use strict'
const http = require('http')
var fs = require('fs')

const params = require('./01_convertor/params.json')
const converta = require('./01_convertor/index')
const findDot = require('./03_pointInSpace')

const app = http.createServer((request, response) => {
  const filePath = request.url.substr(1)
  console.log(filePath)
  console.log(request.url)
  // для конвертора
  if (request.url === '/config') {
    const configList = [
      ...params,
      {
        unit: 'm',
        value_mm: '1000',
      },
      {
        unit: 'cm',
        value_mm: '10',
      },
      {
        unit: 'in',
        value_mm: '25.4',
      },
      {
        unit: 'ft',
        value_mm: '304.8',
      },
    ]
    response.setHeader('Content-Type', 'application/json')
    response.writeHead(200)
    response.end(JSON.stringify(configList))
  }
  if (request.url === '/convert') {
    var data = ''
    request.on('data', function (chunk) {
      data += chunk.toString()
    })
    request.on('end', function () {
      const res = converta(data)
      console.log('res', res)
      response.setHeader('Content-Type', 'application/json')
      response.writeHead(200)
      response.end(JSON.stringify(res))
    })
  }
  //для точки
  if (request.url === '/dot') {
    response.setHeader('Content-Type', 'application/json')
    response.writeHead(200)
    response.end(JSON.stringify(findDot()))
  }

  if (request.url === '/') {
    response.writeHead(200, {
      'Content-Type': 'text/html; charset=utf8'
    })
    fs.createReadStream(__dirname + '/index.html').pipe(response)
  } else {
    fs.access(filePath, fs.constants.R_OK, err => {
      if (err) {
        response.statusCode = 404
        response.end('Resourse not found!')
      } else {
        response.writeHead(200, {
          'Content-Type': 'text/html; charset=utf8'
        })
        fs.createReadStream(filePath).pipe(response)
      }
    })
  }
})


const PORT = 3002
app.listen(PORT)
console.log(`Server running on port ${PORT}`)