<template>
  <Layout>
    <div>
      <form @submit.prevent="onSubmit">
        <input type="search" v-model="search">
        <input type="submit" value="search">
      </form>
    </div>

    <div v-for="shoe in shoes" :key="shoe.id">
      <h2>{{shoe.title}}</h2>
      <img :src="shoe.photo.url" width="200px">
      <h3>size: {{shoe.size}}</h3>
      <p>{{shoe.content}}</p>
      <g-link :to="shoe.path">Learn more</g-link>
    </div>
  </Layout>
</template>

<page-query>
{
  allShoe {
    edges {
      node {
        price
        content
        size
        title
        path
        id
        photo {
          url
        }
      }
    }
  }
}
</page-query>

<script>
export default {
  metaInfo: {
    title: "Welcome to vinted shoes"
  },
  data() {
    return {
      search: "",
      shoes: []
    };
  },
  created() {
    this.shoes = this.getAllShoes();
  },
  methods: {
    getAllShoes() {
      return [...this.$page.allShoe.edges.map(edge => edge.node)];
    },
    onSubmit() {
      if (this.search) {
        this.shoes = this.getAllShoes().filter(shoe =>
          shoe.title.toLowerCase().includes(this.search.toLowerCase())
        );
      } else {
        this.shoes = this.getAllShoes();
      }
    }
  },
  watch: {
    search: function(val) {
      // if user deleted all letter, display all the products
      if (!val) {
        this.shoes = this.getAllShoes();
      }
    }
  }
};
</script>

