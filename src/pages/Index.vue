<template>
  <Layout>
    <section class="section">
      <div>
        <!--
      <form @submit.prevent="onSubmit">
        <input type="search" v-model="search">
        <input type="submit" value="search">
      </form>
        -->
      </div>

      <BulmaGrid :items="shoes" itemsByRow="3">
        <template v-slot="{item: shoe}">
          <div class="card has-text-centered" style="height: 100%">
            <div style="padding:1rem;" class="card-image">
              <figure class="image">
                <img :src="shoe.photo.url" :alt="shoe.title">
              </figure>
            </div>
            <div class="card-content">
              <div class="content">
                <h2>{{shoe.title}}</h2>
                <h3>size: {{shoe.size}}</h3>
                <p>{{shoe.content}}</p>
              </div>
              <g-link class="button is-primary" :to="shoe.path">Learn more</g-link>
            </div>
          </div>
        </template>
      </BulmaGrid>

      <div v-for="shoe in shoes" :key="shoe.id"></div>
    </section>
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
import BulmaGrid from "../components/BulmaGrid";
export default {
  components: {
    BulmaGrid
  },
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


