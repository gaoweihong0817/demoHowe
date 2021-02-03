<template>
  <div class="detail">
    <el-card>
      <section>
        <h6>商品名称</h6>
        <p>{{detail.name}}</p>
      </section>
      <section>
        <h6>商品描述</h6>
        <p>{{detail.subtitle}}</p>
      </section>
      <section>
        <h6>当前状态</h6>
        <p>{{detail.status}}</p>
      </section>
      <section>
        <h6>所属分类</h6>
        <div class="sel">
          <el-select placeholder="请选择一级分类" v-model="value1">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <el-select placeholder="请选择二级分类" v-model="value2">
            <el-option v-for="item in optioned" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </div>
      </section>
      <section>
        <h6>商品价格</h6>
        <el-input :value="detail.price">
          <el-button slot="append">元</el-button>
        </el-input>
      </section>
      <section>
        <h6>商品库存</h6>
        <el-input :value="detail.stock">
          <el-button slot="append">件</el-button>
        </el-input>
      </section>
      <section>
        <h6>商品图片</h6>
        <img :src="detail.imageHost+detail.mainImage" alt />
      </section>
      <section>
        <h6>商品详情</h6>
        <p v-html="detail.detail"></p>
      </section>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detail: [],
      //所属分类
      options: [],
      value1: "",
      optioned: [],
      value2: ""
    };
  },
  methods: {
    getDetail() {
      let data = {
        productId: this.$route.query.productId
      };
      this.$axios.detail(data).then(res => {
        console.log(res.data.data);
        this.detail = res.data.data;

        // this.value1 = res.data.data.categoryId;
        // this.classfiy(res.data.data.categoryId);
      });
    }
    //所属分类
    // async getCategory() {
    //   let data = {
    //     categoryId: 0
    //   };
    //   let { data: res } = await this.$axios.category(data);
    //   // console.log(res)
    //   this.options = res.data;
    // },
    // async classfiy(val) {
    //   //    console.log(this.categoryVal)
    //   let data = {
    //     categoryId: val
    //   };
    //   console.log(data);
    //   let { data: res } = await this.$axios.categoryed(data);
    //   // console.log(res)
    //   this.optioned = res.data;
    // }
  },
  mounted() {
    this.getDetail();
  }
};
</script>

<style scoped lang='scss'>
.el-card {
  margin-top: 10px;
}
section {
  margin-bottom: 20px;
  p {
    margin-top: 6px;
  }
  img {
    width: 100px;
    height: 100px;
    border: 1px solid #ddd;
  }
  .el-input {
    width: 380px;
    margin-top: 10px;
  }
  .sel {
    margin-top: 5px;
    .el-select {
      margin-right: 5px;
    }
  }
}
</style>