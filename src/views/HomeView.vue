<template>
    <div v-if="Products.length>0" class="mx-auto px-0" style="max-width:900px">
      <agile class="main" ref="main" :options="options2" :as-nav-for="asNavFor1">
        <div @click="this.$router.push('/product/'+slide.nameurl)" class="mx-1 slide" v-for="(slide, index) in $root.$data.random" :key="index" :class="`slide--${index}`">
          <div class="card" style="width: ;height: 330px;">
            <img :src="prefix+slide.main_image_name" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">{{slide.name}}</h5>
              <p class="card-text" style="text-decoration:line-through">{{slide.price}}</p>
              <p class="text-primary text-warning fw-bold fs-3" style="">€ {{(slide.price*.95).toFixed(2)}}</p>
            </div>
          </div>
        </div>
      </agile>


    </div>  
    <div v-if="!Products" class="m-5 text-center" >
        <figcaption class="m-5 d-flex justify-content-center">
          <div class="spinner-border text-info" style="width: 3rem; height: 3rem;" role="status">
          </div>
        </figcaption>
    </div>
    <div v-else class="cards">
      <div v-for="i in Products.slice(0,5)" :key="i.id" class="card-product-grid">
          <div style="">
            <router-link :to="'/categorie/'+i.category.replace(' ','_')" class="float-start text-info" >
              {{i.category}}
            </router-link>
          </div>
        <router-link :to="'/product/'+i.nameurl" class="img-wrap" >
        <img :src=prefixthumb+i.main_image_name class="lazyload" alt="no image found" >
        </router-link>
        <figcaption class="info-wrap">
          <router-link :to="'/product/'+i.nameurl" class="h3 fw-bold mb-0" style=''>
            {{i.product}}  
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
import { VueAgile } from 'vue-agile'

export default {
  name: 'HomeView',
  components: {
    agile: VueAgile
   },
  data(){
    return{
      prefixthumb:this.$root.prefixthumb,
      prefix:this.$root.prefix,
      asNavFor1: [],
      asNavFor2: [],
      options1: {
        autoplay: true,
        dots: false,
        fade: true,
        navButtons: true,
        responsive: [
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2
                    }
                },
                
                {
                    breakpoint: 1000,
                    settings: {
                        slidesToShow: 2,
                        navButtons: true
                    }
                }
            ]
      },
      
      options2: {
        autoplay: true,
        centerMode: true,
        dots: false,
        navButtons: false,
        slidesToShow: 3,
        responsive: [
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2
                    }
                },
                
                {
                    breakpoint: 1000,
                    settings: {
                        slidesToShow: 3
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
  mounted(){
    this.asNavFor1.push(this.$refs.thumbnails)
    this.asNavFor2.push(this.$refs.main)
    document.title = "Accueil"
    this.randomize()
    this.$root.RandomProducts()
  },
  computed:{
    Products(){
      return this.randomize()
    }
  },
  watch: {
  // whenever searchinput changes, this function will run

  },  
  methods:{
    goback(){
      return this.$router.go(-1)
      },
    randomize(){
      return this.$root.$data.products.sort(function(){return .5 - Math.random()});
/*      var selected=shuffled.slice(0,n);
*/
    },
  } 
}
</script>
<style scoped>
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
  cursor: pointer;
  font-size: 44px;
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
  height: 350px;
  justify-content: center;
}
.slide img {
  height: 50%;
  -o-object-fit: contain;
     object-fit: contain;
  -o-object-position: center;
     object-position: center;
  width: 100%;
}
.card{
  width: 300px;
}
.card-body{
  color: black;
  padding: 0;
}
</style>