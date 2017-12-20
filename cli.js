#!/usr/bin/env node
'use strict'
const chalk = require('chalk')
const log = console.log
const args = process.argv
const ip = args[2]
const ipRegex = require('ip-regex')
const request = require('request')
const ora = require('ora')
const prettyjson = require('prettyjson')

const usage = () => {
  log(chalk.green.underline.bold('Usage'))
  log(chalk`  $ ip-geocoder {yellow 8.8.8.8}`)
}

log('\n' + chalk.blue.underline.bold('ip-geocoder'))
log('Find geocoding information from IP address')
log(chalk`Powered by {underline ipapi.co}\n`)

if (ip) {
  if (ipRegex.v4({exact: true}).test(ip)) {
    const spinner = ora(`Geocoding IP: ${ip}`).start()
    request(`https://ipapi.co/${ip}/json`, (error, response, body) => {
      spinner.stop()
      if (error) {
        log(chalk.red(chalk`{bold Error} ${error}`))
      } else {
        log(prettyjson.render(JSON.parse(body)))
      }
    })
  } else {
    log(chalk.red(chalk`{bold Error} Invalid IP address input`))
    usage()
  }
} else {
  usage()
}
