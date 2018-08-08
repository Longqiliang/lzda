import request from './request.js'

const API = '/lzda'
const uploadFile = `${API}/fileAction/uploadFile`
const imageUpload = `${API}/person/imageUpload`
export {
  uploadFile,
  imageUpload
}

// 登录
export function login(query) {
  return request({
    url: API + '/login/addlogin',
    method: 'post',
    params: query
  })
}
export function layout(query) {
  return request({
    url: API + '/login/cancellation',
    method: 'get',
    params: query
  })
}
// 数据字典
export function queryArchivesAll(query) {
  return request({
    url: API + '/record/queryArchivesAll',
    method: 'get',
    params: query
  })
}

// 首页
export function queryIndexFourInfo(query) {
  return request({
    url: API + '/index/queryIndexFourInfo',
    method: 'get',
    params: query
  })
}

export function queryBasicInfo(query) {
  return request({
    url: API + '/person/queryBasicInfo',
    method: 'get',
    params: query
  })
}

export function queryDisciplinaryAction(query) {
  return request({
    url: API + '/person/queryDisciplinaryAction',
    method: 'get',
    params: query
  })
}

export function queryUnlawfulList(query) {
  return request({
    url: API + '/index/queryUnlawfulList',
    method: 'get',
    params: query
  })
}

export function queryViolationList(query) {
  return request({
    url: API + '/index/queryViolationList',
    method: 'get',
    params: query
  })
}

export function queryLowIndexList(query) {
  return request({
    url: API + '/index/queryLowIndexList',
    method: 'get',
    params: query
  })
}

export function queryFourFormList(query) {
  return request({
    url: API + '/index/queryFourFormList',
    method: 'get',
    params: query
  })
}

export function queryUnitAnalysisList(query) {
  return request({
    url: API + '/index/queryUnitAnalysisList',
    method: 'get',
    params: query
  })
}
// 系统管理
export function addUnit(query) {
  return request({
    url: API + '/organizes/addUnit',
    method: 'post',
    params: query
  })
}

export function organizesAddDept(query) {
  return request({
    url: API + '/organizes/addDept',
    method: 'post',
    params: query
  })
}


export function updateUnit(query) {
  return request({
    url: API + '/organizes/updateUnit',
    method: 'post',
    params: query
  })
}

export function updateDept(query) {
  return request({
    url: API + '/organizes/updateDept',
    method: 'post',
    params: query
  })
}

export function deleteUnit(query) {
  return request({
    url: API + '/organizes/deleteUnit',
    method: 'post',
    params: query
  })
}

export function deleteDept(query) {
  return request({
    url: API + '/organizes/deleteDept',
    method: 'post',
    params: query
  })
}

export function queryUnitList(query) {
  return request({
    url: API + '/organizes/queryUnitList',
    method: 'get',
    params: query
  })
}

export function queryDeptList(query) {
  return request({
    url: API + '/organizes/queryDeptList',
    method: 'get',
    params: query
  })
}

// 廉情报告
export function queryHonest(query) {
  return request({
    url: API + '/honest/queryHonest',
    method: 'get',
    params: query
  })
}

export function queryProbityReport(query) {
  return request({
    url: API + '/honest/queryProbityReport',
    method: 'get',
    params: query
  })
}

// 个人信息
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

// 人物画像查询
export function queryFigurePortraitCount(query) {
  return request({
    url: API + '/figure/queryFigurePortraitCount',
    method: 'get',
    params: query
  })
}

export function queryFigureReportsList(query) {
  return request({
    url: API + '/figure/queryFigureReportsList',
    method: 'get',
    params: query
  })
}

// 查询部门信息
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

export function queryPersonInfoDetailed(query) {
  return request({
    url: API + '/record/queryPersonInfoDetailed',
    method: 'get',
    params: query
  })
}
