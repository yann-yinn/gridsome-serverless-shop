<template>
  <div>
    <h1>{{$page.shoe.title}}</h1>
    <h2>{{$page.shoe.price}} $</h2>
    <h2>{{$page.shoe.size}}</h2>
    <h2>{{$page.shoe.date}}</h2>
    <h2>{{$page.shoe.photo.url}}</h2>
  </div>
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