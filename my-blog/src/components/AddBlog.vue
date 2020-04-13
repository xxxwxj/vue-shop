<template>
  <div id="add-blog">
    <h2>添加博客</h2>
    <form v-if="!submited">
      <label>博客标题</label>
      <input type="text" v-model="blog.title" required />
      <label>博客内容</label>
      <textarea v-model="blog.content"></textarea>
      <div id="checkboxes">
        <label>Vue.js</label>
        <input type="checkbox" value="Vue.js" v-model="blog.categories" />
        <label>Node.js</label>
        <input type="checkbox" value="Node.js" v-model="blog.categories" />
        <label>React.js</label>
        <input type="checkbox" value="React.js" v-model="blog.categories" />
        <label>Angular4</label>
        <input type="checkbox" value="Angular4" v-model="blog.categories" />
      </div>
      <label>作者</label>
      <select v-model="blog.author">
        <option v-for="(author, index) in authors" :key="index">{{author}}</option>
      </select>
      <button v-on:click.prevent="post">添加博客</button>
    </form>

    <div v-if="submited">
      <h3>您的博客添加成功</h3>
    </div>

    <div id="preview">
      <h3>博客总览</h3>
      <p>博客标题: {{blog.title}}</p>
      <p>博客内容</p>
      <p>{{blog.content}}</p>
      <p>博客分类</p>
      <ul>
        <li v-for="(category, index) in blog.categories" :key="index">{{category}}</li>
      </ul>
      <p>作者: {{blog.author}}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AddBlog",
  data() {
    return {
      blog: {
        title: "",
        content: "",
        categories: [],
        author: ""
      },
      authors: ["jack", "rose", "blande"],
      submited: false
    };
  },
  methods: {
    post() {
      // this.$http.post("http://localhost:3000/blogs", this.blog)
      axios.post("/blogs", this.blog).then(res => {
        this.submited = true;
        console.log(res);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#add-blog * {
  box-sizing: border-box;
}

#add-blog {
  margin: 20px auto;
  max-width: 600px;
  padding: 20px;
}

label {
  display: block;
  margin: 20px 0 10px;
}

input[type="text"],
textarea,
select {
  display: block;
  width: 100%;
  padding: 8px;
}

textarea {
  height: 200px;
}

#checkboxes label {
  display: inline-block;
  margin-top: 0;
}

#checkboxes input {
  display: inline-block;
  margin-right: 10px;
}

button {
  display: block;
  margin: 20px 0;
  background: crimson;
  color: #fff;
  padding: 14px;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
}

#preview {
  padding: 10px 20px;
  border: 1px dotted #ccc;
  margin: 30px 0;
}

h3 {
  margin-top: 10px;
}
</style>
