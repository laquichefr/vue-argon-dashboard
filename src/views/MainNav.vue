<template>
	<nav class="pt-0 navbar navbar-light bg-white fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand text-uppercase" href="#">COMPANYNAME</a>
	<div :class="{'search-bar-show':showSearch}" class="ms-auto search-bar">
		<form @submit.prevent="update_route" class="search-form d-flex align-items-center" >
			<input v-model="searchinput" type="text" name="query" placeholder="Rechercher" title="Enter search keyword">
        <button @click="update_route" class="btn btn-success" type="submit">
					<i class="bi bi-search" style="font-size:x-large"></i>
        </button>
		</form>
  </div>

		<i @click="showSearch=!showSearch" class="d-lg-none bi bi-search ms-auto me-3 nav-item" style="font-size:x-large;cursor: pointer;">
		</i>
	<router-link to="/cart" class="icon me-3">
		<i class="bi bi-cart3" style="font-size:2rem;color:darkslategray;">
			<span v-if="$root.$data.nbitems>0" class="badge rounded-circle px-1 py-0">
				<span class="visually-hidden">New alerts</span>
			</span>
		</i>
	</router-link>
    <i class="bi bi-list" style="font-size:xx-large" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar"></i>

    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">COMPANYNAME</h5>
        <button type="button" id="closemenu" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <ul class="navbar-nav align-items-start">
			<li v-if="$root.$data.issignedIn" class="nav-item mb-2">
				<a @click="signOut" class="btn btn-outline-primary">
					<i class="fa fa-power-off"></i>
					<span class="text"> Déconnection</span>
				</a>
			</li>
			<li class="nav-item">
				<router-link to="/login" @click="nextpath" v-if="!$root.$data.issignedIn" class="btn btn-outline-primary">Me connecter</router-link>
				<router-link to="/signup" v-if="!$root.$data.issignedIn" class="ms-2 btn btn-primary me-auto" >Inscription</router-link>
			</li>
			<router-link v-if="$root.$data.issignedIn" to="/client" class="nav-item">
				<i class="bi bi-person-circle icon icon-md"></i>
				<strong>{{$root.$data.client.name}}</strong>
			</router-link>
      <li class="nav-item">
        <a class="nav-link" aria-current="page" href="#">Accueil</a>
      </li>

			<li class="nav-item">
				<a class="nav-link" href="https://admin.poc-shop.lapinicho.com">Admin</a>
			</li>
			<li class="nav-item">
				<router-link to="/contact" >
					<i class="bi bi-envelope icon icon-md"></i> Contact
				</router-link>
			</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="container-fluid">
    <span class="btn btn-outline-secondary text-uppercase fw-bold" style="" type="button" data-bs-toggle="collapse" data-bs-target="#showcateg" aria-controls="showcateg" aria-expanded="false" aria-label="Toggle navigation">
			<div v-if="$route.name=='categorie'" class="py-1 fw-bold" style="" >
				{{$route.params.name.replace('_',' ')}}
			</div>
			<div v-else class="py-1 fw-bold" style="" >
				catégories
			</div>
    </span>
		<router-link v-if="$root.$data.issignedIn" to="/client" class="nav-item">
			<i class="bi bi-person-circle icon icon-md"></i>
			<strong>{{$root.$data.client.name}}</strong>
		</router-link>

  </div>
  <div class="mt-3 collapse navbar-collapse" id="showcateg">
		<div class="container-fluid border-bottom border-3">
			<ul class="mb-2 nav">
				<li v-for="i,j in $root.categories" :key="j">
					<router-link class="fw-bold category" :to="'/categorie/'+i.replace(' ','_')">{{i}}</router-link>
				</li>
			</ul>
		</div>
	</div> <!-- navbar-collapse.// -->
</nav>
</template>

<script >
  import { Auth } from 'aws-amplify';

  export default {
	name: 'MainNav',
	components: {

	},

    data(){
    return{
		prefix:this.$root.$data.prefix,
		category:"",
		searchinput:"",
		showSearch:false
      }
    },
    mounted(){
		this.$root.getCartStorage()
    },
    methods:{
			nextpath(){
				localStorage.setItem('next',this.$route.path)
			},
			search(){
				if (this.searchinput.length>=2) {
					this.$router.push('/recherche/'+this.searchinput)
				}
			},
			update_route(){
				this.$router.push('/recherche/'+this.searchinput)
				console.log()
			},
			async getcat(){
					let url="getcat/"
					let param = { method: 'GET' ,
												headers:{}}
					let res = await fetch(url,param)
					this.$root.$data.categories = await res.json()
	/*			    	this.$root.$data.categories = data.sort((a, b) => a < b ? -1 : 1 )
	*/			},

			async signOut() {
				try {
					await Auth.signOut()
	/*            console.log('signed out')
	*/            this.issignedIn = false
				} catch (error) {
					console.log('error signing out: ', error);
				}
			}
    }
}
</script>
<style scoped>
.navbar-brand {
    -webkit-text-fill-color: #49505700;
    background: linear-gradient(100deg, #9155fd, #647eff);
    -webkit-background-clip: text;
    font-weight: bold;
    font-size: 1.5rem;
}
@media (max-width: 768px) {
  .search-bar {
    position: fixed;
    top: 45px;
    left: 0;
    right: 0;
    padding: 10px 20px 10px 20px;
    box-shadow: 0px 0px 15px 0px rgba(1, 41, 112, 0.1);
    background: mediumpurple;
    z-index: 9999;
    transition: 0.3s;
    visibility: hidden;
    opacity: 0;
    width: 100%;
  }
	.search-bar-show {
		top: 45px;
		visibility: visible;
		opacity: 1;
		}
}
@media (min-width: 769px){
	.d-lg-none {
		display: none!important;
	}
	.search-bar{
		margin-right: 1rem;
	}
}
.search-bar {
    min-width: 360px;
}
.search-form {
  width: 100%;
}

.search-form input {
  border: 0;
  color: #012970;
  border: 1px solid rgba(1, 41, 112, 0.2);
  padding: 7px 38px 7px 8px;
  border-radius: 3px;
  transition: 0.3s;
  width: 100%;
}

.search-form input:focus,
.search-form input:hover {
  outline: none;
  box-shadow: 0 0 10px 0 rgba(1, 41, 112, 0.15);
  border: 1px solid rgba(1, 41, 112, 0.3);
}

.search-form button {
  border: 0;
  padding: 0;
  margin-left: -30px;
  background: none;
}

.search-form button i {
  color: #012970;
}

</style>