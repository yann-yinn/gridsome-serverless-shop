<template>
  <Layout>
    <div class="section">
      <div class="columns">
        <div class="column">
          <img :src="$page.shoe.photo.url">
        </div>
        <div class="column is-two-thirds">
          <div class="content">
            <h1>{{$page.shoe.title}}</h1>

            <h2>{{$page.shoe.price}} $</h2>
            <h2>{{$page.shoe.size}}</h2>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query Shoe ($path: String!) {
  shoe (path: $path) {
    title
    price
    size
    date
    photo {
      url
    }
  }
}
</page-query>