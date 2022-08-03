<template>
    <div v-if="$root.$data.issignedIn" class="container my-5">
    <div class="row">
      <aside class="col-md-3 mb-5">
        <!--   SIDEBAR   -->
        <ul class="list-group">
          <a @click="rubrique = 'commandes';" class="list-group-item" > Mes commandes </a>
          <a @click="rubrique = 'coordonnees'" class="list-group-item" >Mes coordonnées </a>
        </ul>
        <br>
        <!--   SIDEBAR .//END   -->
      </aside>
      <article v-if="rubrique == 'commandes'" class="accordion col-md-9" id="accordion_pay">
        <div  class="card">
          <header class="card-header">
            <img :src="prefix+'payment-paypal.png'" class="float-right" height="24"> 
            <label class="form-check collapsed" data-toggle="collapse" data-target="#pay_paynet">
              <input class="form-check-input" name="payment-option" checked="" type="radio" value="option2">
              <h6 class="form-check-label"> 
                <strong class="d-inline-block mr-3">Commande n°: 6123456789</strong>
                <span>Date: 16 Decembre 2018</span>
              </h6>
            </label>
          </header>
          <div id="pay_paynet" class="collapse show" data-parent="#accordion_pay">
          <div class="card-body">
            <div class="row"> 
              <div class="col-md-8">
                <h6 class="text-muted">Délivrée à</h6>
                <p><b>{{client.name}} {{client.family_name}}<br>
                  {{client.address}}<br> 
                {{client.email}}</b><br>
                {{client.phone_number}}<br>
                </p>
              </div>
              <div class="col-md-4">
                <h6 class="text-muted">Payment</h6>
                <span class="text-success">
                  <i class="fab fa-lg fa-cc-visa"></i>
                    Visa  **** 4216  
                </span>
                <p>Sous-total: €356 <br>
                 Frais de livraison:  €56 <br> 
                 <span class="b">Total:  €456 </span>
                </p>
              </div>
            </div> <!-- row.// -->
          </div> <!-- card body .// -->
          </div> <!-- collapse .// -->
        </div>
      </article>
      <form @submit.prevent="clientupdate" v-if="rubrique == 'coordonnees'" class="col-md-9 block-register">
            <div class="form-floating mb-1">
              <input v-model="client.email" disabled type="email" class="form-control" name="email" id="floatingEmail" placeholder="needed">
              <label for="floatingEmail">Email</label>
            </div>
            <div class="form-floating mb-1">
              <input v-model="client.family_name" type="text" class="form-control text-uppercase" name="name" id="floatingName" placeholder="Name" >
              <label for="floatingName">Nom</label>
            </div>
            <div class="form-floating mb-1">
              <input v-model="client.name" type="text" class="form-control text-uppercase" name="firstname" id="floatingFirstname" placeholder="firstname" >
              <label for="floatingFirstname">Prénom</label>
            </div>
            <div class="form-floating mb-1">
              <input v-model="client.phone_number" type="tel" class="form-control" name="phone" id="floatingPhone" placeholder="+33">
              <label for="floatingPhone">Téléphone</label>
            </div>
            <div class="form-floating mb-1">
              <input v-model="client.address" type="text" class="form-control" name="address" id="floatingAddress" placeholder="Address">
              <label for="floatingAddress">Adresse</label>
            </div>
            <div class="form-floating mb-1">
              <input v-model="client['custom:zipcode']" type="text" class="form-control" name="zipcode" id="floatingZipcode" placeholder="zipcode">
              <label for="floatingZipcode">Code Postal</label>
            </div>
            <div class="form-floating mb-1">
              <input v-model="client['custom:city']" type="text" class="form-control text-uppercase" name="city" id="floatingCity" placeholder="city">
              <label for="floatingCity">Ville</label>
            </div>
            <div v-if="response" class="alert alert-success p-2 mb-1">
          {{response}}<i class="ms-2 bi bi-person-check-fill" style="font-size:2rem"></i>
            </div>
        <div class="form-row mb-2">
          <div>
            <button type="submit" class="w-100 btn btn-primary">Valider</button>
          </div> 
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify'

// @ is an alias to /src

export default {
  name: 'ClentView',
  components: {
   },
  data(){
    return{
      client:"",
      rubrique:"commandes",
      prefix:this.$root.prefix,
      response:""
      }
  },
  created(){
    this.attributes()
  },
  mounted(){
    document.title = "Mon compte"
  },
  computed:{
  },
  watch: {
  // whenever searchinput changes, this function will run

  },  
  methods:{
    async attributes(){
      let user = await Auth.currentAuthenticatedUser();
/*      let result = await Auth.updateUserAttributes(user, {
          'email': 'me@anotherdomain.com',
          'address': '1 rue de la soif',
          'name':'jane',
          'family_name':'doe',
          'zipcode':'57000',
          'city':'METZ'
      });
      console.log(result); // SUCCESS
      user = await Auth.currentAuthenticatedUser()*/
      this.client = user.attributes;
    },
    close(){
      this.response = ''
    },
    async clientupdate(){
      let user = await Auth.currentAuthenticatedUser();
      let result = await Auth.updateUserAttributes(user, {
          'family_name': this.client.family_name,
          'name': this.client.name,
          'phone_number': this.client.phone_number,
          'email': this.client.email,
          'address': this.client.address,
          'custom:city': this.client['custom:city'],
          'custom:zipcode': this.client['custom:zipcode'],
      })
        console.log(result)
      result == 'SUCCESS'?this.response = 'Données enregistrées':this.response = "Erreur lors de l'enregistrement"
        setTimeout(this.close,4000)
    }
  } 
}
</script>
