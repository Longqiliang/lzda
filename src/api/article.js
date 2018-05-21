import request from './request.js'

const API = '/api'

export function queryTermPerson(query) {
  return request({
    url: API + '/person/queryTermPerson',
    method: 'get',
    params: query
  })
}

export function addPerson(query) {
  return request({
    url: API + '/person/addPerson',
    method: 'post',
    params: query
  })
}

export function updatePerson(query) {
  return request({
    url: API + '/person/updatePerson',
    method: 'post',
    params: query
  })
}

export function queryPerson(query) {
  return request({
    url: API + '/person/queryPerson',
    method: 'get',
    params: query
  })
}

export function deletePerson(query) {
  return request({
    url: API + '/person/deletePerson',
    method: 'post',
    params: query
  })
}

export function queryOrganize() {
  return request({
    url: API + '/organizes/queryOrganize',
    method: 'get'
  })
}

export function addRecord(query) {
  return request({
    url: API + '/record/addRecord',
    method: 'post',
    params: query
  })
}

export function updateRecord(query) {
  return request({
    url: API + '/record/updateRecord',
    method: 'post',
    params: query
  })
}

export function deleteRecord(query) {
  return request({
    url: API + '/record/deleteRecord',
    method: 'post',
    params: query
  })
}

export function addunit(query) {
  return request({
    url: API + '/record/addunit',
    method: 'post',
    params: query
  })
}

export function addDept(query) {
  return request({
    url: API + '/record/addDept',
    method: 'post',
    params: query
  })
}

export function queryRecord(query) {
  return request({
    url: API + '/record/queryRecord',
    method: 'get',
    params: query
  })
}

export function queryRecordList(query) {
  return request({
    url: API + '/record/queryRecordList',
    method: 'get',
    params: query
  })
}

export function queryRecordDetails(query) {
  return request({
    url: API + '/record/queryRecordDetails',
    method: 'get',
    params: query
  })
}
