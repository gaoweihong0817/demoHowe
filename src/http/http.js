// 导入封装好的axios
import insteace from './index'
//导入封装好得接口地址得api.js
import api from './api'

import qs from "qs"
//封装接口
//登录
function login(data) {
  return insteace({
    url: api.login,
    method: "post",
    data: qs.stringify(data)
  })
}
//退出登录
function Edit() {
  return insteace({
    url: api.Edit,
    method: "post"
  })
}
//商品管理
function Pages(pageNum) {
  return insteace({
    url: `manage/product/list.do?pageNum=${pageNum}`,
    method: "get"
  })
}
//修改状态
function StatueId(id, status) {
  return insteace({
    url: `manage/product/set_sale_status.do?productId=${id}&status=${status}`,
    method: "get"
  })
}
//注册接口
export default {
  login,
  Edit,
  Pages,
  StatueId
}