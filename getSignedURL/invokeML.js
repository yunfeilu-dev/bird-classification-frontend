'use strict'

const AWS = require('aws-sdk')
AWS.config.update({ region: process.env.AWS_REGION })
const client = new AWS.APIGateway()
// Change this value to adjust the signed URL's expiration
const URL_EXPIRATION_SECONDS = 300
// Main Lambda entry point
const axios = require('axios')

exports.handler = async (event) => {
  console.log(event.queryStringParameters.s3uri)
  const body = await getUploadURL(event)
  console.log(body.data)
  const res = body.data
  return res
}


const getUploadURL = async function(event) {
  var url = 'https://u57s4fj5gh.execute-api.ap-northeast-1.amazonaws.com/alpha/classification';
  console.log('calling ML service...')
  return new Promise((res, rej) => {
    axios
      .post(url, {
        s3uri: event.queryStringParameters.s3uri
      })
      .then(_res => {
        console.log(`statusCode: ${res.status}`)
        console.log(_res)
        res(_res)
        console.log('Complete calling the service')
      })
      .catch(error => {
        console.error(error)
        rej(error)
      })
  })
}


