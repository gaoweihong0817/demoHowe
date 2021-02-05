<template>
  <div class="cate">
    <p>当前商品分类ID：0</p>
    <el-table :data="cate" style="width: 100%" stripe border>
      <el-table-column prop="id" label="品类ID"></el-table-column>
      <el-table-column prop="name" label="品类名称"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <span>
            <a href="#" @click="Edit(scope.row.id)">修改名称</a>
          </span>&emsp;
          <span>
            <a href="#" @click="Child(scope.row.id)">查看其子品类</a>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <!--修改名称  -->
    <el-dialog title="修改名称" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="请输入新的品类名称">
          <el-input v-model="categoryName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="ensure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cate: [],
      dialogFormVisible: false,
      Id: "",
      categoryName: ""
    };
  },
  methods: {
    getcate() {
      this.$axios.cate().then(res => {
        console.log(res);
        this.cate = res.data.data;
        this.categoryName = res.data.data[name];
        console.log(this.categoryName);
      });
    },
    //修改名称
    Edit(id) {
      this.Id = id;
      this.dialogFormVisible = true;
    },
    ensure() {
      let params = {
        categoryId: this.Id,
        categoryName: this.categoryName
      };
      console.log(params);
      this.$axios.setCategoryName(params).then(res => {
        console.log(res);
        this.dialogFormVisible = false;
      });
    },

    Child(id) {
      console.log(id);
    }
  },
  mounted() {
    this.getcate();
  }
};
</script>

<style scoped>
p {
  margin: 10px 0;
}
a {
  color: #5988bb;
  text-decoration: none;
}
</style>