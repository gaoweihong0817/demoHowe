<template>
  <div class="goods">
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
            @click="Shang(scope.row)"
          >上架</el-button>
          <el-button type="warning" size="small" v-else>下架</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <a href="javascript:;">查看</a>&emsp;
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
      id: "",
      status: ""
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

    Shang(id, status) {
      console.log(id);
      this.id = id.id;
      this.status = id.status;
      this.$confirm("确认要上架该商品", "是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios.StatueId(this.id, this.status).then(res => {
            console.log(res);
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改"
          });
        });
    }
    // Xia(id, status) {
    //   console.log(id.id);
    //   console.log(id.status);
    //   this.$confirm("确认要下架该商品", "是否继续?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(() => {
    //       this.productId = id.id;
    //       // this.status = id.status;
    //       this.$axios.StatueId({ productId, status: 2 }).then(res => {
    //         this.$message({
    //           type: "success",
    //           message: "已修改成功"
    //         });
    //       });
    //       this.getList();
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消修改"
    //       });
    //     });
    // }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style scoped>
.el-table,
.el-pagination {
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
</style>