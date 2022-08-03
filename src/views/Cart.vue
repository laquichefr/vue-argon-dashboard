<template>
	<div class="container">
		<h1 class="text-start my-3 py-3" style="">PANIER <i class="bi bi-cart3" ></i></h1>
		<aside class="mx-auto col-md-12 col-lg-9" v-if="Object.keys($root.$data.cart) != 0">
			<article>
				<div class="row mb-1" v-for="i,j in $root.$data.cart" :key="j">
					<div class="col-md-6">
						<figure class="itemside">
							<div class="aside"></div>
								<figcaption class="">
									<router-link :to="'/product/'+i.nameurl" class="title"><b>{{i.name}}</b></router-link>
									<b class="float-start">{{i.price}} €</b>
									<div>
										<a class=" btn-link" style="cursor:pointer" v-on:click="$root.removeFromCart(j)"> Retirer</a>
									</div>
								</figcaption>
						</figure> 
					</div> <!-- col.// -->
					<div class="col-7 col-md-3 text-md-right text-right"> 
						<div class="input-group mb-3">
							<span v-on:click="$root.decrease(j)" class="input-group-text"><i class="bi bi-dash-lg"></i></span>
								<input type="number" class="form-control" v-on:input="$root.setQuantity(j,$event.target.value)" :value="i.quantity" >
							<span v-on:click="$root.increase(j)" class="input-group-text"><i class="bi bi-plus-lg"></i></span>
						</div>
					</div>
					<div class="col col-md-3 col-lg-2 text-md-right "> 
						<strong class="price-cart">{{i.totalProduct}} €</strong>
					</div>
					<hr class="mt-1">
				</div> <!-- row.// -->
			</article> <!-- card-group.// -->
		</aside> <!-- col.// -->
		<aside v-if="Object.keys($root.$data.cart) != 0" class="col-md-8 col-lg-6 mx-auto">
			<div class="card-body">
				<dl class="price-cart float-end">
					<dd class="text-right text-dark b"><strong>Total: {{$root.$data.total}} €</strong></dd>
				</dl>
				<router-link to="order" class="w-100 mb-2 btn btn-primary btn-block text-uppercase">Passer la commande </router-link>
				<router-link to="/" class="w-100 btn btn-outline-primary btn-block">Continuer mes achats</router-link>
			</div> <!-- card-body.// -->
		</aside> <!-- col.// -->
		<aside v-else class="text-center my-5"><h1>Aucun article</h1></aside>
	</div>
</template>

<script >
  export default {
		name: 'CartView',
		components: {
    
  },

    data(){
    return{
			prefixthumb:this.$root.prefixthumb,
			cartProducts:{}
      }
    },
    mounted(){
			this.$root.getCartStorage()
			document.title = "Panier"
			this.populateCart()
    },
    methods:{
			populateCart(){
				for (let i in this.$root.$data.cart) {
					this.cartProducts[i] = this.get(i)
				}
			},
			get(id){
				return JSON.parse(sessionStorage.getItem('loadedProducts')).find(i=>i.id==id)
			}
		},
}
</script>