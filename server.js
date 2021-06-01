const express = require('express')
const {resolve} = require('path')

app = express()

app.use('/', express.static(resolve(__dirname, './build')))

app.listen(process.env.PORT, () => {
  console.log('App is running')
})