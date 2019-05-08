<template>
  <Layout>
    <section class="section">
      <div>
        <form @submit.prevent="onSubmit">
          <div class="field has-addons">
            <div class="control is-expanded">
              <input class="input" type="text" placeholder="Find a repository" v-model="search">
            </div>
            <div class="control">
              <input type="submit" value="search" class="button is-primary">
            </div>
          </div>
        </form>
      </div>
      <br>
      <br>
      <Pager class="pager" :info="$page.allShoe.pageInfo"/>
      <BulmaGrid :items="shoes" itemsByRow="4">
        <template v-slot="{item: shoe}">
          <div class="card has-text-centered" style="height: 100%">
            <div style="padding:1rem;" class="card-image">
              <figure class="image" style="height:100px;overflow:hidden">
                <g-image style="object-fit: cover;" :src="shoe.photo.url" :alt="shoe.title"/>
              </figure>
            </div>
            <div class="card-content">
              <div class="content">
                <h2>{{shoe.title}}</h2>
                <h3></h3>
                <p>
                  <strong>size:</strong>
                  {{shoe.size}}
                  <br>
                  <strong>price:</strong>
                  <br>
                  {{shoe.price}}
                </p>
              </div>
              <g-link class="button is-outlined" :to="shoe.path">Learn more</g-link>
            </div>
          </div>
        </template>
      </BulmaGrid>

      <div v-for="shoe in shoes" :key="shoe.id"></div>
    </section>
  </Layout>
</template>

<page-query>
query($page: Int){
  allShoe(perPage:100, page: $page) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
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
import { Pager } from "gridsome";
export default {
  components: {
    BulmaGrid,
    Pager
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


