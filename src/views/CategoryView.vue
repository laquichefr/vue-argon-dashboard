<template>
    <div class="dropdown align-items-center">
      <button class="ms-1  btn btn-outline-secondary dropdown-toggle" type="button" id="dropdownFilter" data-bs-toggle="dropdown" aria-expanded="false">
        Classer par
      </button>
      <button @click="removeSorting" v-if="filter" class="ms-1  btn btn-outline-primary" type="button">
        {{filter}} X
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownFilter">
        <li><a @click="sortMinusPlus" class="dropdown-item">Prix croissant</a></li>
        <li><a @click="sortPlusMinus" class="dropdown-item">Prix décroissant</a></li>
      </ul>
    </div>
    <div v-if="!ProductsbyCategory" class="m-5 text-center" >
        <figcaption class="m-5 d-flex justify-content-center">
          <div class="vue-simple-spinner" style="margin: 0px auto; border-radius: 100%; border-width: 3px; border-style: solid; border-color: rgb(33, 150, 243) rgb(238, 238, 238) rgb(238, 238, 238); border-image: initial; width: 40px; height: 40px; animation: 0.8s linear 0s infinite normal none running vue-simple-spinner-spin;"></div>
        </figcaption>
    </div>
    <div v-else class="cards">
      <div v-for="i in ProductsbyCategory" :key="i.id" class="card-product-grid">
        <router-link :to="'/product/'+i.nameurl" class="img-wrap" >
          <img :src=prefixthumb+i.main_image_name>
        </router-link>
        <figcaption class="info-wrap">
          <router-link :to="'/product/'+i.nameurl" class="h3 fw-bold" style=''>
            {{i.name}}  
          </router-link>
          <div class="d-flex justify-content-between align-items-center">
            <div class="price mt-1">{{i.price}} €</div> <!-- price-wrap.// -->
            <a @click="$root.addToCart(i)" class="way_icon btn btn-outline-primary tt btn-md">
              <i class="bi bi-cart3"></i>
              <b v-if="$root.cart[i.id]" >{{$root.cart[i.id].quantity}}
              </b>
            </a>
          </div>
        </figcaption>
      </div>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'CategoryView',
  components: {
   },
  data(){
    return{
      ProductsbyCategory:"",
      prefixthumb:this.$root.prefixthumb,
      filter:""
      }
  },
  created(){
    this.load()
    document.title = "catégorie "+this.$route.params.name.replace(' ','-')
  },
  computed:{
  },
  watch: {
  // whenever searchinput changes, this function will run

  },  
  methods:{
    async load () {
      if (sessionStorage.getItem('loadedProducts')) {
        this.ProductsbyCategory = JSON.parse(sessionStorage.getItem('loadedProducts')).filter(i=>i.category == this.$route.params.name.replace('_',' '))
      }else {
        let url="loadproducts"
        let param = { headers:{'X-Requested-With': 'XMLHttpRequest'}} //Necessary to work with request.is_ajax()
          console.log('cat',this.cat,url)
        let response = await fetch(url,param)
        let data = await response.json()
        this.ProductsbyCategory = data.filter(i=>i.category == this.$route.params.name.replace('_',' '))
        sessionStorage.setItem('loadedProducts',JSON.stringify(data))
        }
      },
    sortPlusMinus(){
        let s = JSON.parse(sessionStorage.getItem('loadedProducts')).filter(i=>i.category == this.$route.params.name.replace('_',' '))
        this.ProductsbyCategory = s.sort((i,j)=>j.price-i.price)
        this.filter = "Prix décroissant"
    }, 
    sortMinusPlus(){
        let s = JSON.parse(sessionStorage.getItem('loadedProducts')).filter(i=>i.category == this.$route.params.name.replace('_',' '))
        this.ProductsbyCategory = s.sort((i,j)=>i.price-j.price)
        this.filter = "Prix croissant"
    },
    removeSorting(){
        this.ProductsbyCategory = JSON.parse(sessionStorage.getItem('loadedProducts')).filter(i=>i.category == this.$route.params.name.replace('_',' '))
        this.filter = ""
    }    
  } 
}
</script>
