<template>
  <section >
  <div class="container py-3">
    <h2 class="title-page">Conditions Générales de Vente</h2>

  </div> <!-- container //  -->
  </section>
  <section >
  <div class="container">

  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
  proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  <p>Ut enim ad minim veniam,
  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
  proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

  <a @click="goback" class="btn btn-outline-primary"> « Retour</a>

  </div> <!-- container .//  -->
  </section>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'CgvView',
  components: {
   },
  data(){
    return{

      }
  },
  created(){

  },
  mounted(){
    document.title = "CGV"
  },  
  computed:{
  },
  watch: {
  // whenever searchinput changes, this function will run
  },  
  methods:{
    goback(){
      return this.$router.go(-1)
    },
  } 
}
</script>