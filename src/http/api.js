export default {
  //登录
  login: "manage/user/login.do",
  //退出登录
  Edit: "user/logout.do",
  // 搜索
  search: "manage/product/search.do?listType=search&pageNum=1",
  //detail 详情
  detail: "manage/product/detail.do?",
  //所属品类  categoryId=100002
  category: "manage/category/get_category.do?categoryId=0",//一级
  categoryed: "manage/category/get_category.do?categoryId=100002"//二级
}