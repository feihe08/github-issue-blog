'use babel';

import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 10000
})

export default function github(config, issue) {
  return api.post(`repos/${config.userName}/${config.repo}/issues`, issue, {
    headers: {
      'Authorization': `token ${config.token}`
    }
  })
}
