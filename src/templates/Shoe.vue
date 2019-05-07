<template>
  <Layout>
    <div class="section">
      <div class="content">
        <h1>{{$page.shoe.title}}</h1>
        <img :src="$page.shoe.photo.url">
        <h2>{{$page.shoe.price}} $</h2>
        <h2>{{$page.shoe.size}}</h2>
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