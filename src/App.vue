<template>
  <MainNav/>
  <router-view v-slot="{ Component, route }">
    <transition name="bounce" mode="out-in">
      <div :key="route.path" class="main-router" style="margin-top:8rem">  
        <component :is="Component" :key="route.path"></component>
      </div>
    </transition>
  </router-view>

</template>
<script >
  import { Auth , Hub} from 'aws-amplify';
  import MainNav from './views/MainNav.vue'

  export default {
  components: {
    MainNav
  },
  data(){
    return{
      issignedIn:false,
      idtoken:"",
      products:[],
      nbitems:"",
      cart:{},
      total:0,
      client:"",
      bucket:"poc-shop",
      random:[],
      next:"",
      company:{
        paypalID:"AWOq0vYY5YzBvdVA7CQ3MEiFYhyLRaIa4BA3UJ4Dh26_lniJkfYs8wq7KKHfpFTbPz2wnEfnFNiqLUYx"
        },
      }
    },
    computed:{
      categories(){
        let data = [...new Map(this.products.map((d) => [d["category"], d])).keys()]
        return data
      },
      prefix(){
        if (window.location.hostname == 'localhost') {
          return "https://"+this.bucket+".s3.eu-west-3.amazonaws.com/images/"
        }else {
          return "/images/"
        }
      },
      prefixthumb(){
        if (window.location.hostname == 'localhost') {
          return "https://"+this.bucket+".s3.eu-west-3.amazonaws.com/thumbnails/thumbnail_"
        }else {
          return "/thumbnails/thumbnail_"
        }
      }
    },

    beforeCreate() {
      Hub.listen('auth', data => {
/*        console.log('data:', data)
*/        const { payload } = data
        if (payload.event === 'signIn') {
          this.issignedIn = true
          localStorage.getItem('next')?this.$router.push(localStorage.getItem('next')):this.$router.push('/')
        }
        if (payload.event === 'signOut') {
          this.$router.push('/')
          this.issignedIn = false
        }
      }) 
      Auth.currentAuthenticatedUser()
      .then((data) => {
        this.idtoken =  data.signInUserSession.idToken.jwtToken
        this.issignedIn = true
      })
      .catch(() => this.issignedIn = false)
    },
    created(){
      this.load()
    },
    mounted(){

    },
    methods:{
    checkPath(){
      localStorage.getItem('next')?this.$router.push(localStorage.getItem('next')):{}
      localStorage.removeItem('next')
    },
    async load(){
        let url="https://7z0rwnvtjj.execute-api.eu-west-3.amazonaws.com/dev/products"
        let param = {}
        let response = await fetch(url,param)
        this.products = await response.json()
/*        console.log('data',this.products)
*//*        this.company = data['company']
        this.client = data['client']
*/        sessionStorage.setItem('loadedProducts',JSON.stringify(this.products))
        this.RandomProducts()
        },
    RandomProducts(){
      this.random = []
      for (var i = 0; i < 5; i++){
        this.random.push(this.products[Math.floor(Math.random()*this.products.length)])
      }
    },
    getCartStorage(){
      if (localStorage.getItem('cart')) {
        this.cart = JSON.parse(localStorage.getItem('cart'))
      }
      this.getTotal()
    },
    addToCart(obj){
      if (obj.id in this.cart) {
        this.cart[obj.id].quantity++
      }
      else {
        this.cart[obj.id] = {name:obj.name,price:obj.price,quantity:1,nameurl:obj.nameurl}
      }
      let productTotal = (this.cart[obj.id].price * this.cart[obj.id].quantity).toFixed(2)
      this.cart[obj.id].totalProduct = productTotal
      this.getTotal()
    },
    decrease(id){
      if (this.cart[id].quantity < 0) {
        this.cart[id].quantity = Math.abs(this.cart[id].quantity)
      }
      this.cart[id].quantity--
      if (this.cart[id].quantity == 0) {
        this.removeFromCart(id)
        return
      }
      let productTotal = (this.cart[id].price * this.cart[id].quantity).toFixed(2)
      this.cart[id].totalProduct = productTotal
      this.getTotal()
    },
    increase(id){
      if (this.cart[id].quantity < 0) {
        this.cart[id].quantity = Math.abs(this.cart[id].quantity)
      }
      this.cart[id].quantity++
      let productTotal = (this.cart[id].price * this.cart[id].quantity).toFixed(2)
      this.cart[id].totalProduct = productTotal
      this.getTotal()
    },
    setQuantity(id,value){
      if ( isNaN(value) || value <= 0 ) { value = 1 }
      this.cart[id].quantity = Math.abs(Number(value))
      let productTotal = (this.cart[id].price * this.cart[id].quantity).toFixed(2)
      this.cart[id].totalProduct = productTotal
      this.getTotal()
    },
    removeFromCart(id){
      delete( this.cart[id] )
      this.getTotal()
    },
    setCartStorage(){
      localStorage.setItem('cart',JSON.stringify(this.cart))
    },
    getTotal(){
      this.total = 0
      Object.values(this.cart).forEach( i => this.total += Number(i.totalProduct))
      this.total = this.total.toFixed(2)
      this.setCartStorage()
      this.itemscount()
    },
    itemscount(){
      let nb = 0
      let z = Object.values(this.cart)
      z.forEach( i => nb+= i.quantity )
      this.nbitems = nb
    },
    }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


</style>
