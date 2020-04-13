<template>
  <div id="single-blog">
    <h1>{{blog.title}}</h1>
    <article>{{blog.content}}</article>
    <p>作者: {{blog.author}}</p>
    <p>分类:</p>
    <ul>
      <li v-for="(category, index) in blog.categories" :key="index">{{category}}</li>
    </ul>
    <button @click="deleteBlog">删除</button>
    <router-link :to="'/edit/' + id">编辑</router-link>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SingleBlog",
  data() {
    return {
      id: this.$route.params.id,
      blog: []
    };
  },
  methods: {
    deleteBlog() {
      axios.delete("/blogs/" + this.id).then(res => {
        console.log(res);
        this.$router.push({ path: "/" });
      });
    }
  },
  created() {
    axios.get("/blogs/" + this.id).then(res => {
      console.log(res);
      this.blog = res.body;
    });
  }
};
</script>

<style scoped>
#single-blog {
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
  background: #eee;
  border: 1px dotted #aaa;
}
a {
  color: #fff;
  text-decoration: none;
  padding: 12px;
  background: crimson;
  border-radius: 5px;
}
button {
  display: block;
  margin: 20px 0;
  background: crimson;
  color: #fff;
  padding: 14px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}
</style>
