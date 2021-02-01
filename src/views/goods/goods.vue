<template>
  <div class="goods">
    <!-- 查询 -->
    <div class="search">
      <el-select v-model="valueId" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <el-button @click="search">查询</el-button>
    </div>
    <!-- 渲染数据 -->
    <el-table :data="List" stripe style="width: 100%" border>
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column label="姓名">
        <template slot-scope="scope">
          <p>{{scope.row.name}}</p>
          <p>{{scope.row.subtitle}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价钱"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status==1" class="span">在售</span>
          <span v-else class="span">已下架</span>
          <el-button
            type="warning"
            size="small"
            v-if="scope.row.status==2"
            @click="Shang(scope.row.id,scope.row.status)"
          >上架</el-button>
          <el-button
            type="warning"
            size="small"
            v-else
            @click="Shang(scope.row.id,scope.row.status)"
          >下架</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <a href="javascript:;" @click="Look(scope.row.id)">查看</a>&emsp;
          <a href="javascript:;">编辑</a>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      background
      :current-change="pageNum"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //参数 条数
      pageNum: 1,
      // pageSize:10,
      //渲染表格
      List: [],
      total: 0,
      //查询
      options: [
        {
          value: "productId",
          label: "按商品id查询"
        },
        {
          value: "productName",
          label: "按商品名称查询"
        }
      ],
      valueId: "productId",
      input: ""
    };
  },
  methods: {
    getList() {
      this.$axios.Pages(this.pageNum).then(res => {
        if (res.data.status == 0) {
          this.List = res.data.data.list;
          this.total = res.data.data.total;
        }
      });
    },
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum;
      this.getList();
    },
    //上下架
    Shang(id, status) {
      console.log(id, status);
      this.$confirm("确认要上架或下架该商品", "是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (status == 2) {
            this.$axios.StatueId(id, 1).then(res => {
              this.getList();
            });
          } else {
            this.$axios.StatueId(id, 2).then(res => {
              this.getList();
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改"
          });
        });
    },
    //查询
    search() {
      if (this.valueId == "productId") {
        this.$axios
          .search({
            productId: this.input
          })
          .then(res => {
            this.List = res.data.data.list;
          });
      } else if (this.valueId == "productName") {
        this.$axios
          .search({
            productName: this.input
          })
          .then(res => {
            this.List = res.data.data.list;
          });
      }
    },
    //详情
    Look(id) {
      this.$router.push(`/detail?productId=${id}`);
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style scoped>
.el-table,
.el-pagination,
.search {
  margin-top: 10px;
}
a {
  color: #5988bb;
  text-decoration: none;
}
.span {
  display: inline-block;
  margin-right: 10px;
}
.p {
  position: absolute;
  right: 290px;
  top: 20px;
}
.el-input {
  width: 280px;
  margin: 0 10px;
}
</style>