<template>
  <div class="detail">
    <el-card>
      <section>
        <h6>商品名称</h6>
        <el-input v-model="name" placeholder="商品名称" />
      </section>
      <section>
        <h6>商品描述</h6>
        <el-input v-model="description" placeholder="商品描述" />
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
        <el-input v-model="pricer" type="number" placeholder="商品价格">
          <el-button slot="append">元</el-button>
        </el-input>
      </section>
      <section>
        <h6>商品库存</h6>
        <el-input v-model="stock" type="number" placeholder="商品库存">
          <el-button slot="append">件</el-button>
        </el-input>
      </section>
      <section>
        <h6>商品图片</h6>
        <!-- <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>-->
      </section>
      <section>
        <h6>商品详情</h6>
        <quill-editor
          class="editor"
          ref="myTextEditor"
          v-model="content"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)"
          @change="onEditorChange($event)"
        ></quill-editor>
      </section>
      <el-button type="success" class="btn" @click="getEditor">提交</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      description: "",
      pricer: "",
      stock: "",
      //所属分类
      options: [],
      value1: "",
      optioned: [],
      value2: "",
      Id: "",
      //富文本
      content: "",
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
            ["blockquote", "code-block"], // 引用  代码块
            [{ header: 1 }, { header: 2 }], // 1、2 级标题
            [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
            [{ script: "sub" }, { script: "super" }], // 上标/下标
            [{ indent: "-1" }, { indent: "+1" }], // 缩进
            // [{'direction': 'rtl'}],                         // 文本方向
            [{ size: ["small", false, "large", "huge"] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
            [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
            [{ font: [] }], // 字体种类
            [{ align: [] }], // 对齐方式
            ["clean"], // 清除文本格式
            ["link", "image", "video"] // 链接、图片、视频
          ] //工具菜单栏配置
        },
        placeholder: "请在这里添加产品描述", //提示
        readyOnly: false, //是否只读
        theme: "snow", //主题 snow/bubble
        syntax: true //语法检测
      },
      id: this.$route.query.productId,
      parentCategoryId: ""
    };
  },

  methods: {
    //修改
    getDetail() {
      let data = {
        productId: this.$route.query.productId
      };
      this.$axios.detail(data).then(res => {
        console.log(res.data.data);
        (this.name = res.data.data.name),
          (this.description = res.data.data.subtitle),
          (this.pricer = res.data.data.price),
          (this.stock = res.data.data.stock),
          (this.content = res.data.data.detail),
          (this.value1 = res.data.data.categoryId);
        this.value2 = res.data.data.parentCategoryId;
        (this.Id = res.data.data.categoryId),
          (this.parentCategoryId = res.data.data.parentCategoryId);
      });
    },
    //所属分类
    getCID() {
      this.$axios.category(this.Id).then(res => {
        this.options = res.data.data;
      });
    },
    getcategoryed() {
      this.$axios.categoryed(this.parentCategoryId).then(res => {
        this.options = res.data.data;
      });
    },
    //富文本
    // 失去焦点
    onEditorBlur(editor) {},
    // 获得焦点
    onEditorFocus(editor) {},
    // 开始
    onEditorReady(editor) {},
    // 值发生变化
    onEditorChange(editor) {
      this.content = editor.html;
      console.log(editor);
    },
    //图片上传
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    //修改数据
    getEditor() {
      const params = {
        categoryId: this.Id,
        name: this.name,
        subtitle: this.description,
        subImages: this.subImages,
        detail: this.content,
        price: this.pricer,
        stock: this.stock,
        status: this.status,
        id: this.id
      };
      this.$axios.save(params).then(res => {
        this.$router.push("/goods");
      });
    }
  },
  mounted() {
    this.getDetail();
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quillEditor;
    }
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
.btn {
  margin-top: 60px;
}
.editor {
  line-height: normal !important;
  height: 200px;
}
.ql-snow .ql-tooltip[data-mode="link"]::before {
  content: "请输入链接地址:";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: "保存";
  padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode="video"]::before {
  content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
  content: "10px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
  content: "18px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
  content: "32px";
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "标准字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
  content: "衬线字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
  content: "等宽字体";
}
</style>