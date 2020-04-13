<template>
  <div id="show-blogs" v-theme="'wide'">
    <h1>博客总览</h1>
    <input type="text" v-model="search" placeholder="搜索" />
    <div class="single-blog" v-for="blog in filteeredBlogs" :key="blog.id">
      <router-link v-bind:to="'/blog/' + blog.id">
        <h2 v-rainbow>{{blog.title | to-uppercase}}</h2>
      </router-link>
      <article>{{blog.content | snippet}}</article>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ShowBlogs",
  data() {
    return {
      blogs: [],
      search: ""
    };
  },
  created() {
    axios.get(":3000/blogs").then(data => {
      // this.blogs = data.body.slice(0, 10);
      this.blogs = data.body;
      console.log(this.blogs);
    });
  },
  computed: {
    filteeredBlogs: function() {
      return this.blogs.filter(blog => blog.title.match(this.search));
    }
  },
  filters: {
    toUppercase: value => value.toUpperCase(),
    snippet: value => value.slice(0, 100) + "..."
  },
  directives: {
    rainbow: {
      bind(el) {
        el.style.color =
          "#" +
          Math.random()
            .toString(16)
            .slice(2, 8);
      }
    },
    theme: {
      bind(el, binding) {
        if (binding.value === "wide") {
          el.style.maxWidth = "1260px";
        } else if (binding.value === "narrow") {
          el.style.maxWidth = "560px";
        }
        if (binding.arg === "column") {
          el.style.background = "#6677cc";
          el.style.padding = "20px";
        }
      }
    }
  }
};
</script>

<style scoped>
#show-blogs {
  max-width: 800px;
  margin: 0 auto;
}

.single-blog {
  padding: 20px;
  margin: 20px 0;
  box-sizing: border-box;
  background: #eee;
  border: 1px dotted #aaa;
}

#show-blogs a {
  text-decoration: none;
  color: #444;
}

input[type="text"] {
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
}
</style>
