<template>
    <div v-if="searched" class="p-2 text-center" style="font-size:x-large">
      <span v-if="Products.length==0">Aucun article trouvé pour <b>{{searched}}</b></span>
      <span v-else-if="Products.length==1">{{Products.length}} article trouvé pour <b>{{searched}}</b></span>
      <span v-else-if="Products.length>1">{{Products.length}} articles trouvés pour <b>{{searched}}</b></span>
    </div>
    <div v-if="searching" class="m-5 text-center" >
      <div class="spinner-border text-info" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-else class="cards">
      <div v-for="i in Products" :key="i.id" class="card-product-grid">
        <router-link :to="'/product/'+i.nameurl" class="img-wrap" >
          <img v-bind:src=prefixthumb+i.main_image_name>
        </router-link>
        <figcaption class="info-wrap">
          <router-link :to="'/product/'+i.nameurl" class="h3 fw-bold" style=''>
            {{i.name}}  
          </router-link>
          <div class="d-flex justify-content-between">
            <div class="price mt-1">{{i.price}} €</div> <!-- price-wrap.// -->
          </div>
        </figcaption>
      </div>
    </div>

</template>

<script >
  export default {
    name: 'RechercheView',
    components: {
    
  },

  data(){
    return{
      Products:"",
      prefixthumb:this.$root.prefixthumb,
      searchinput:"",
      searching:false,
      searched:""
      }
    },
  mounted(){
    this.$route.params.name == '@'?{}:this.searchinput = this.$route.params.name
    this.search()
    document.title = 'recherche '+ this.searchinput

    },
  methods:{
    async search(){
      let s = JSON.parse(sessionStorage.getItem('loadedProducts'))
      if (this.searchinput.length >= 2) {
        console.log(this.searchinput)
        this.searching = true
        await new Promise(r => setTimeout(r, 300));
        let found = s.filter(i=>i.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(this.searchinput.toLowerCase()))
        this.Products = found
        console.log('filtered',found)
        this.searching = false
        this.searched = this.searchinput
        this.$route.params.name = this.searchinput
      }
    }
		},
}
</script>