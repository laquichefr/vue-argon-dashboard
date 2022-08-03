<template>
  <div class="container">
  <h1 class="text-start my-3 py-3" style="">COMMANDE</h1>
  <!-- ============================ COMPONENT 2 ================================= -->
  <div class="row">
      <main class="col-md-6">
  <article class="card my-2">
    <div class="card-body">
      <div class="row">
        <div v-for="i,j in $root.$data.cart" :key="j" class="col-md-12">
          <span class="float-start text-primary fw-bold">{{i.name}}</span>
          <span class="float-end">{{i.quantity}} x {{i.price}} €  =  <b>{{i.totalProduct}} €</b></span>
        </div> <!-- col.// -->
      </div> <!-- row.// -->
    </div> <!-- card-body.// -->
  </article> <!-- card.// -->
  <article class="card mb-4">
  <div class="card-body">
    <h4 class="card-title mb-4">Adresse de Facturation</h4>
    <form v-if="$root.$data.issignedIn" action="">
      <div class="row">
            <div class="form-floating mb-1">
              <input v-model="client.family_name" type="text" class="form-control text-uppercase" name="name" id="floatingName" placeholder="Name" disabled>
              <label for="floatingName">Nom</label>
            </div>
            <div class="form-floating mb-1">
              <input v-model="client.name" type="text" class="form-control text-uppercase" name="firstname" id="floatingFirstname" placeholder="Firstname" disabled>
              <label for="floatingFirstname">Prénom</label>
            </div>
            <div class="form-floating mb-1">
              <input v-model="client.phone_number" type="tel" class="form-control" name="phone" id="floatingPhone" placeholder="Phone" disabled>
              <label for="floatingPhone">Téléphone</label>
            </div>
            <div class="form-floating mb-1">
              <input v-model="client.address" type="text" class="form-control" name="address" id="floatingAddress" placeholder="Address" disabled>
              <label for="floatingAddress">Adresse</label>
            </div>
            <div class="form-floating mb-1">
              <input v-model="client['custom:city']" type="text" class="form-control text-uppercase" name="city" id="floatingCity" placeholder="City" disabled>
              <label for="floatingCity">Ville</label>
            </div>
            <div class="form-floating mb-1">
              <input v-model="client['custom:zipcode']" type="number" class="form-control" name="zipcode" id="floatingZipcode" placeholder="Zipcode" disabled>
              <label for="floatingZipcode">Code Postal</label>
            </div>
            <div class="form-floating mb-1">
              <input v-model="client.email" type="email" class="form-control" name="login" id="floatingEmail" placeholder="Email" disabled>
              <label for="floatingEmail">Email</label>
            </div>
      </div> <!-- row.// -->  
    </form>
    <form v-else action="">
      <div class="row">
            <div class="form-floating mb-1">
              <input v-model="guest.name" type="text" class="form-control" name="name" id="floatingName" placeholder="Name" required>
              <label for="floatingName">Nom</label>
            </div>
            <div class="form-floating mb-1">
              <input v-model="guest.firstname" type="text" class="form-control" name="firstname" id="floatingFirstname" placeholder="Firstname" required>
              <label for="floatingFirstname">Prénom</label>
            </div>
            <div class="form-floating mb-1">
              <input v-model="guest.phone" type="number" class="form-control" name="phone" id="floatingPhone" placeholder="Phone" required>
              <label for="floatingPhone">Téléphone</label>
            </div>
            <div class="form-floating mb-1">
              <input v-model="guest.address" type="text" class="form-control" name="address" id="floatingAddress" placeholder="Address" required>
              <label for="floatingAddress">Adresse</label>
            </div>
            <div class="form-floating mb-1">
              <input v-model="guest.city" type="text" class="form-control text-uppercase" name="city" id="floatingCity" placeholder="City" required>
              <label for="floatingCity">Ville</label>
            </div>
            <div class="form-floating mb-1">
              <input v-model="guest.zipcode" type="number" class="form-control" name="zipcode" id="floatingZipcode" placeholder="Zipcode" required>
              <label for="floatingZipcode">Code Postal</label>
            </div>
            <div class="form-floating mb-1">
              <input v-model="guest.email" type="email" class="form-control" name="login" id="floatingEmail" placeholder="Email" required>
              <label for="floatingEmail">Email</label>
            </div>
      </div> <!-- row.// -->  
    </form>
  </div> <!-- card-body.// -->
  </article> <!-- card.// -->
  <article class="card mb-4">
    <div class="card-body">
        <h4 class="card-title mb-4">Mode de livraison</h4>
          <div @click="shipping_mode = 'livraison';shipping_cost()" class="form-check " style="">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="radio_livraison" :checked="shipping_mode=='livraison'">
            <label class="form-check-label" for="radio_livraison">
              LIVRAISON + {{shipping_price}} €
              <p>Nous livrons dans un rayon de 10 kms.</p>
            </label>
          </div>
        <div v-if="shipping_mode == 'livraison'" class="">
          <div class="ms-5 form-group">
            <div class="form-check">
              <input class="form-check-input" type="radio" name="radio_address_choice" id="radio_ship_to_bill" :checked="ship_to=='bill'">
              <label @click="showAdd = false;ship_to='bill'" class="form-check-label w-100" for="radio_ship_to_bill">
                Livrer à l'Adresse de Facturation
                  <div v-if="$root.$data.issignedIn" class="mx-3 text-uppercase">
                    <b>{{client.address.address}} {{client.address.zipcode}} {{client.address.city}}</b>
                  </div>
                  <div v-else class="mx-3 text-uppercase">
                    {{guest.address}} {{guest.zipcode}} {{guest.city}}
                  </div>
              </label>
            </div>
            <div  v-for="i,j in client.addresses" :key="j" class="radio my-2" ><!-- Additional Addresses.// -->
              <label>
                <input v-model="address_choice" type="radio" :value="i">
                  <b class="mx-3 text-uppercase">  {{i.address}} {{i.zipcode}} {{i.city}}</b>
                <button @click="erase(i.id)" class="btn btn-sm btn-info">Effacer</button>
              </label>
            </div>
          </div>
          <div class="mb-3 form-group">
            <div class="ms-5 form-check">
              <input class="form-check-input" type="radio" name="radio_address_choice" id="radio_new_address" :checked="ship_to=='new'">
              <label @click="showAdd = true;ship_to='new'" class="form-check-label w-100" for="radio_new_address">
                Livrer à une autre adresse
              </label>
            </div>
            <div v-if="showAdd==true" class="row" >
                  <div class="form-floating mb-1">
                    <input v-model="shipping.name" type="text" class="form-control" name="name" id="floatingName" placeholder="Name" required>
                    <label for="floatingName">Nom</label>
                  </div>
                  <div class="form-floating mb-1">
                    <input v-model="shipping.firstname" type="text" class="form-control" name="firstname" id="floatingFirstname" placeholder="Firstname" required>
                    <label for="floatingFirstname">Prénom</label>
                  </div>
                  <div class="form-floating mb-1">
                    <input v-model="shipping.phone" type="number" class="form-control" name="phone" id="floatingPhone" placeholder="Phone" required>
                    <label for="floatingPhone">Téléphone</label>
                  </div>
                  <div class="form-floating mb-1">
                    <input v-model="shipping.address" type="text" class="form-control" name="address" id="floatingAddress" placeholder="Address" required>
                    <label for="floatingAddress">Adresse</label>
                  </div>
                  <div class="form-floating mb-1">
                    <input v-model="shipping.city" type="text" class="form-control text-uppercase" name="city" id="floatingCity" placeholder="City" required>
                    <label for="floatingCity">Ville</label>
                  </div>
                  <div class="form-floating mb-1">
                    <input v-model="shipping.zipcode" type="number" class="form-control" name="zipcode" id="floatingZipcode" placeholder="Zipcode" required>
                    <label for="floatingZipcode">Code Postal</label>
                  </div>
            </div>
          </div>
        </div> <!-- row.// -->
          <div @click="shipping_mode = 'Click & collect';shipping_cost()" class="form-check mt-2" style="">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="radio_click&collect" :checked="shipping_mode=='Click & collect'" >
            <label class="form-check-label w-100" for="radio_click&collect">
              CLICK & COLLECT
              <p>Vous récupérez votre commande dans nos locaux</p>
            </label>
          </div>
    </div> <!-- card-body.// -->
  </article> <!-- card.// -->
  <!-- accordion end.// -->
    
      </main> <!-- col.// -->
      <aside class="col-md-6 my-4">
        <div class="card shadow">
        <div class="card-body">
          <h4 class="mb-3">Résumé</h4>
          <dl class="dlist-align">
            <dt class="">Livraison:</dt>
            <dd v-if="shipping_mode=='Click & collect'">{{shipping_mode}}</dd>
          </dl>
          <dl v-if="shipping_mode=='livraison'" class="dlist-align ">
            <div v-if="$root.$data.issignedIn & ship_to=='bill'">
              <div class="text-uppercase">{{client.family_name}} {{client.name}}</div>
              <div>{{client.address}}</div>
              <div>{{client.zipcode}} {{client.city}}</div>
              <div>{{client.email}}</div>
              <div>{{client.phone_number}}</div>
            </div>
            <div v-if="$root.$data.issignedIn & ship_to=='new'">
              <div class="text-uppercase">{{shipping.name}} {{shipping.firstname}}</div>
              <div>{{shipping.address}}</div>
              <div>{{shipping.zipcode}} {{shipping.city}}</div>
              <div>{{shipping.email}}</div>
              <div>{{shipping.phone}}</div>
            </div>
            <div v-if="!$root.$data.issignedIn & ship_to=='bill'">
              <div class="text-uppercase">{{guest.name}} {{guest.firstname}}</div>
              <div>{{guest.address}}</div>
              <div>{{guest.zipcode}} {{guest.city}}</div>
              <div>{{guest.email}}</div>
              <div>{{guest.phone}}</div>
            </div>
            <div v-if="!$root.$data.issignedIn & ship_to=='new'">
              <div class="text-uppercase">{{shipping.name}} {{shipping.firstname}}</div>
              <div>{{shipping.address}}</div>
              <div>{{shipping.zipcode}} {{shipping.city}}</div>
              <div>{{shipping.email}}</div>
              <div>{{shipping.phone}}</div>
            </div>
          </dl>
          <hr>
          <dl class="dlist-align">
            <dt>SOUS-TOTAL:</dt>
            <dd class="">€ {{$root.$data.total}}</dd>
          </dl>
          <dl class="dlist-align">
            <dt>LIVRAISON:</dt>
            <dd v-if="shipping_mode=='livraison'" class="">€ {{shipping_price}}</dd>
          </dl>
          <dl class="dlist-align">
            <dt>TOTAL:</dt>
            <dd class="h5 fw-bold">€ {{totalAS}}</dd>
          </dl>
          <hr>
          <div class="form-check">
            <input v-model="acceptCGV" class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
            <label class="form-check-label" for="flexCheckDefault">
              J'ai lu et j'accepte les <router-link to="/cgv"><b>conditions générales de vente</b></router-link>
            </label>
          </div>
          <div ref="paypal"></div>
        </div> <!-- card-body.// -->
        </div> <!-- card.// -->
      </aside> <!-- col.// -->
    </div> <!-- row.// -->

  <!-- ============================ COMPONENT 2 END//  ================================= -->
  </div> <!-- container .//  -->
</template>

<script>
// @ is an alias to /src
import { Auth } from 'aws-amplify'
import { loadScript } from "@paypal/paypal-js";

export default {
  name: 'orderView',
  components: {
   },
  data(){
    return{
      client:"",
      ship_to:"",
      prefix:this.$root.$data.prefix,
      shipping_price:5,
      shipping_mode:"",
      pay_mode:"PayPal",
      address_choice:"",
      shipping:{
        name:"",
        firstname:"",
        phone:"",
        address:"",
        zipcode:"",
        city:"",
      },
      guest:{
        address:"",
        zipcode:"",
        city:"",
        name:"",
        firstname:"",
        phone:"",
        email:""
      },
      showAdd:false,
      acceptCGV:""
      }
  },
  created(){
    this.$root.$data.totalAS = this.$root.$data.total
    this.attributes()
    this.retrieveData()
  },
  mounted(){
    this.paypal()
    document.title = "commande"
  },  
  computed:{
     totalAS(){
      return this.$root.$data.totalAS
     }
  },
  watch: {
  // whenever searchinput changes, this function will run
  },  
  methods:{
    async attributes(){
      try {
        let user = await Auth.currentAuthenticatedUser();
        this.client = user.attributes;
      } catch(e) {
          console.log(e);
      }
    },
    shipping_cost(){
      if (this.shipping_mode == 'livraison') {
        this.$root.$data.totalAS = (Number(this.$root.$data.total) + this.shipping_price).toFixed(2)
      }if (this.shipping_mode == 'Click & collect') {
        this.$root.$data.totalAS = this.$root.$data.total
      }
    },    
    async paypal(){
      let paypal;

      try {
          paypal = await loadScript({ "client-id": this.$root.$data.company.paypalID, currency: "EUR" });
      } catch (error) {
          console.error("failed to load the PayPal JS SDK script", error);
      }
      if (paypal) {
          try {
              await paypal.Buttons({
                  style: {
                    layout: 'vertical',
                    color:  'white',
                    shape:  'rect',
                    label:  'pay',
                  },
                  createOrder: (data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: this.totalAS
                          }
                        }
                      ]
                    });
                  },
                  onApprove: async (data, actions) => {
                    let order = await actions.order.capture();
                    console.log(order);
                    this.$router.push({ name: "confirm",params: { order: JSON.stringify(order) } })
                  },
                  onError: err => {
                    console.log(err);
                  }
              }).render(this.$refs.paypal);
          } catch (error) {
              console.error("failed to render the PayPal Buttons", error);
          }
      }
      },
    saveData(){
      sessionStorage.setItem('shipping',JSON.stringify(this.shipping))
      sessionStorage.setItem('ship_to',this.ship_to)
      sessionStorage.setItem('shipping_mode',this.shipping_mode)
      sessionStorage.setItem('guest',JSON.stringify(this.guest))
      sessionStorage.setItem('pay_mode',this.pay_mode)
      sessionStorage.setItem('showAdd',this.showAdd)
    },
    retrieveData(){
      sessionStorage.getItem('shipping')?this.shipping = JSON.parse(sessionStorage.getItem('shipping')):{}
      sessionStorage.getItem('ship_to')?this.ship_to = sessionStorage.getItem('ship_to'):{}
      sessionStorage.getItem('shipping_mode')?this.shipping_mode = sessionStorage.getItem('shipping_mode'):{}
      sessionStorage.getItem('guest')?this.guest = JSON.parse(sessionStorage.getItem('guest')):{}
      sessionStorage.getItem('pay_mode')?this.pay_mode = sessionStorage.getItem('pay_mode'):{}
      sessionStorage.getItem('showAdd')?this.showAdd = sessionStorage.getItem('showAdd'):{}
    },
    async save_address(){
      if (this.new_address && this.new_zipcode && this.new_city ) {
          console.log('save_address token')
        await this.$root.getnewtoken()
        let form = new FormData();
        console.log('address not null')
        form.set('address', this.new_address);
        form.set('city', this.new_city);
        form.set('zipcode', this.new_zipcode);
        form.set('csrfmiddlewaretoken',this.$root.$data.token );
        let param = { method: 'POST' ,
                      headers:{},
                      body:form
                    }
        let url="saveAddress/"
        let res = await fetch(url,param)
          let response = await res.json()
          console.log(response)
          this.$root.checkAuth()
        this.new_address = "",
        this.new_zipcode = "",
        this.new_city = "",
        this.showAdd = false
      }
    },
    async erase(id){
        console.log('delete address token')
      await this.$root.getnewtoken()
      let form = new FormData();
      form.set('id', id);
      form.set('csrfmiddlewaretoken',this.$root.$data.token );
        console.log('id',id)
      let param = { method: 'POST' ,
                    headers:{},
                    body:form
                  }
      let url="deleteAddress/"
      let res = await fetch(url,param)
        let response = await res.json()
        console.log('data from delete address',response)
        this.$root.checkAuth()
        this.$root.$data.token = ""
    },
    async process_order(){
        let url="process_order/"
        let form = JSON.stringify({cart:this.$root.$data.cart,
                                    total:this.$root.$data.total,
                                    guest:this.guest,
                                    shipping:this.shipping,
                                    shipping_price:this.shipping_price,
                                    shipping_mode:this.shipping_mode,
                                    pay_mode:this.pay_mode},
        )
        let param = { method: 'POST' ,
                headers:{},
                body:form
              }
        let res = await fetch(url,param)
        let response = await res.json()
        console.log('process order response',response)
    }
  } 
}
</script>
