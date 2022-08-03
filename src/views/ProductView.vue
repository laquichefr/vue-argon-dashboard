<template>
  <div class="container-fluid" aria-label="breadcrumb">
    <ol class="mb-0 breadcrumb">
      <li class="breadcrumb-item "><router-link :to="'/categorie/'+ product.category">{{product.category}}</router-link></li>
      <li class="breadcrumb-item " aria-current="page">{{$route.params.name}}</li>
    </ol>
  </div>

    <div class="container-fluid">
      <article>
        <div v-if="product.msg" class="h3 text-center font-weight-bold" style="height: 100px">{{product.msg}}</div>
          <div v-if="!product.msg" class="row">
            <aside class="col-md-6">
              <agile class="" ref="main" :options="options1" :as-nav-for="asNavFor1">
                <div class="slide" v-for="(slide, index) in imgs" :key="index" :class="`slide--${index}`">
                  <img :src="slide"/>
                </div>
              </agile>
              <agile class="thumbnails" ref="thumbnails" :options="options2" :as-nav-for="asNavFor2">
                <div class="slide slide--thumbnail" v-for="(slide, index) in imgs" :key="index" :class="`slide--${index}`" @click="$refs.thumbnails.goTo(index)"><img :src="slide"/></div>
              </agile>
            </aside>
            <main class="col-md-6">
              <article>
<!--                 <router-link :to="'/categorie/'+product.category.replace(' ','_')" class="category" style="width:fit-content" >{{product.category}}</router-link>
 -->                <h1 class="fw-bold">{{product.name}}</h1>

                <hr>
          
                <div class="mb-3">
                  <div class="px-3" style="white-space: pre-wrap;border-left:3px solid #ff7c0b" >
                    {{product.description}}
                  </div>
                </div>
                
                <div class="mb-3">
                  <var class="priceproductpage">{{product.price}} €</var> <br>
                </div> <!-- price-detail-wrap .// -->

                <div class="mb-4 d-flex justify-content-center">
                  <a v-if="!incart" @click="$root.addToCart(product);isincart(this.product.id)" class="btn btn-outline-primary w-100">
                    <i class="bi bi-cart3" style="font-size: xx-large"></i>
                  </a>
                  <div v-if="incart" class="input-spinner mt-1 ">
                    <div class="input-group mb-3">
                      <span v-on:click="$root.decrease(product.id);isincart(this.product.id)" class="input-group-text justify-content-center" style="font-size:1.5rem;width:100px;cursor:pointer">
                        <i class="bi bi-dash-lg"></i>
                      </span>
                      <input v-model="quantity" type="number" class="form-control" v-on:input="$root.setQuantity(product.id,$event.target.value);isincart(this.product.id)" style="max-width:100px;flex-basis:100px">
                      <span v-on:click="$root.increase(product.id);isincart(this.product.id)" class="input-group-text justify-content-center" style="font-size:1.5rem;width:100px;cursor:pointer">
                        <i class="bi bi-plus-lg"></i>
                      </span>
                    </div>
                  </div> <!-- input-group.// -->
                </div>
              </article> <!-- product-info-aside .// -->
            </main> <!-- col.// -->
          </div> <!-- row.// -->
      </article>
    </div>
</template>

<script>
// @ is an alias to /src
import { VueAgile } from 'vue-agile'

export default {
  name: 'HomeView',
  components: {
    agile: VueAgile,
   },
  data(){
    return{
      prefix:this.$root.prefix,
      product: "",
      quantity: "",
      incart: false,
      imgs:[],
      asNavFor1: [],
      asNavFor2: [],
      options1: {
        dots: false,
        fade: true,
        navButtons: false
      },
      
      options2: {
        autoplay: true,
        centerMode: true,
        dots: false,
        navButtons: false,
        slidesToShow: this.imgnumber,
        responsive: [
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: this.imgnumber
                    }
                },
                
                {
                    breakpoint: 1000,
                    settings: {
                        slidesToShow: this.imgnumber,
                        navButtons: false
                    }
                }
            ]
        
      },
      
      slides: [
          'https://images.unsplash.com/photo-1453831362806-3d5577f014a4?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
          'https://images.unsplash.com/photo-1496412705862-e0088f16f791?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
          'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
          'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
          'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
          'https://images.unsplash.com/photo-1472926373053-51b220987527?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
          'https://images.unsplash.com/photo-1497534547324-0ebb3f052e88?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ'
        ]      
      }
  },
  created(){
    this.load_one(this.$route.params.name)
    document.title = this.$route.params.name
  },
  mounted () {
    this.asNavFor1.push(this.$refs.thumbnails)
    this.asNavFor2.push(this.$refs.main)
  },
  computed:{
  },
  watch: {
    imgnumber(){
      let len = this.imgs.length
      return len
    }
  // whenever searchinput changes, this function will run

  },  
  methods:{
    isincart(id){
      if (this.$root.$data.cart[id]) {
        this.incart = true
        this.quantity = this.$root.$data.cart[id].quantity
      }else {
        this.incart = false
        this.quantity = 0
      }
      /*console.log('incart',this.incart)*/
    },
    async load_one(nameurl) {
/*      let url="https://7z0rwnvtjj.execute-api.eu-west-3.amazonaws.com/dev/product/"+nameurl.replaceAll('_',' ')
      let response = await fetch(url)
      this.product = await response.json()
*/
      this.product = JSON.parse(sessionStorage.getItem('loadedProducts')).find(i=>i.nameurl == nameurl)
      if (this.product.msg) {console.log('produit non trouvé')}
      else {
        this.imgs.push(this.prefix + this.product.main_image_name)
        this.isincart(this.product.id)
/*        console.log('qty',this.quantity)
*/      }
    },
    imgSelect(){
      this.img = this.prefix + this.product.main_image_name
    },
  } 
}
</script>
<style>
.main {
  margin-bottom: 30px;
}

.thumbnails {
  margin: 0 -5px;
  width: calc(100% + 10px);
}

.agile__nav-button {
  background: transparent;
  border: none;
  color: #ccc;
  cursor: pointer;
  font-size: 24px;
  transition-duration: 0.3s;
}
.thumbnails .agile__nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.thumbnails .agile__nav-button--prev {
  left: -45px;
}
.thumbnails .agile__nav-button--next {
  right: -45px;
}
.agile__nav-button:hover {
  color: #888;
}
.agile__dot {
  margin: 0 10px;
}
.agile__dot button {
  background-color: #eee;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: block;
  height: 10px;
  font-size: 0;
  line-height: 0;
  margin: 0;
  padding: 0;
  transition-duration: 0.3s;
  width: 10px;
}
.agile__dot--current button, .agile__dot:hover button {
  background-color: #888;
}

.slide {
  align-items: center;
  box-sizing: border-box;
  color: #fff;
  display: flex;
  height: 450px;
  justify-content: center;
}
.slide--thumbnail {
  cursor: pointer;
  height: 100px;
  padding: 0 5px;
  transition: opacity 0.3s;
}
.slide--thumbnail:hover {
  opacity: 0.75;
}
.slide img {
  height: 100%;
  -o-object-fit: contain;
     object-fit: contain;
  -o-object-position: center;
     object-position: center;
  width: 100%;
}
</style>