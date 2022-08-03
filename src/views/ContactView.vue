<template>
  <div class="container">
    <h1 class="text-start my-3 py-3" style="color:cornflowerblue">CONTACT</h1>
    <div class="row my-5">
      <aside class="col-md-4 col-12 d-flex justify-content-around">
            <article class="mr-md-4 fw-bold">
              <div class="mb-2"> <i class="bi bi-geo-alt" style="color:var(--bs-primary);font-size:1.5rem"></i> {{company.address}} {{company.zipcode}} {{company.city}} </div>
              <div class="mb-2"> <i class="bi bi-envelope" style="color:var(--bs-primary);font-size:1.5rem"></i> <a :href="'mailto:'+company.email" >{{company.email}}</a></div>
              <div class="mb-2"> <i class="bi bi-telephone" style="color:var(--bs-primary);font-size:1.5rem"></i> {{company.phone}}</div>
            </article>
      </aside>    
      <aside v-if="!sent" class="col-md-8 col-12 mt-3">
        <h4 class="text-center card-title ">Laissez-nous un message</h4>
        <form @submit.prevent="send">
          <div class="form-floating mb-1">
            <input v-model="contact.email" type="email" class="form-control" name="login" id="floatingEmail" placeholder="Email" required>
            <label for="floatingEmail">Email</label>
          </div>
          <div class="form-floating mb-3">
            <select v-model="contact.sujet" class="form-select" name="category" id="floatingSelect" aria-label="Floating label select ">
              <option value="commandes" selected>commandes</option>
              <option value="demande d'informations">demande d'informations</option>
              <option value="signaler un disfonctionnement du site">signaler un disfonctionnement du site</option>
              <option value="autre">autre</option>
            </select>
            <label for="floatingSelect">SUJET</label>
          </div>

          <div class="form-floating mb-1">
            <textarea v-model="contact.msg" class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 200px" required></textarea>
            <label for="floatingTextarea2">Message</label>
          </div>
          <div class="form-group">
            <button  type="submit" class="btn btn-primary w-100"> Envoyer  </button>
          </div> <!-- form-group// -->    
        <h4 v-if="rsp" class="text-center text-white p-4 bg-primary">{{rsp}}</h4>
        </form>
      </aside>
      <div v-if="sent" class="container p-3 card-product-grid">
        <h2>Un accusé de réception a été envoyé à {{contact.email}}.</h2>
        <h2>La team 
          <strong style="color:cornflowerblue">COMPANYNAME</strong>
          va revenir vers vous afin de trouver une solution.
        </h2>
      </div>
    </div><!-- row -->
  </div><!-- container -->
</template>

<script>
// @ is an alias to /src

export default {
  name: 'ContactView',
  components: {
   },
  data(){
    return{
      sent:false,
      contact:{
        email:"",
        sujet:"",
        msg:"",
      },
      rsp:"",
      }
  },
  created(){

  },
  mounted(){
    
  },
  computed:{
    company(){
      return this.$root.$data.company
    }
  },
  watch: {
  // whenever searchinput changes, this function will run

  },  
  methods:{
    async send(){
      let param = { method: 'POST' ,
              headers:{'Content-Type':'application/json',},
              body:JSON.stringify(this.contact)
              }
      let url="https://7z0rwnvtjj.execute-api.eu-west-3.amazonaws.com/dev/contact"
      let response = await fetch(url,param)
      this.rsp = await response.json()
      this.sent = true
    },
  } 
}
</script>
