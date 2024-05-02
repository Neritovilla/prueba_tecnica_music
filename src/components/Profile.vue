<template>

  <div class="container-fluid">
    <!--header with lateral menu-->
    <header class="row align-items-center hearder_col">
      <div class="row">
        <div class="col">
          <button class="btn btn-menu" @click="toggleMenu">
            <span v-if="showMenu">&#x2630;</span>
            <span v-else>&#9776;</span>
          </button>
        </div>
        <div class="col">
          <h3>Sistema web Music</h3>
        </div>
        <div class="col col-profile">
          <button class="btn btn-menu" @click="goProfile">Perfil</button>
          <button class="btn btn-menu" @click="closeSession">Salir</button>
        </div>
      </div>
    </header>
    <div class="offcanvas offcanvas-start lateral-menu" :class="{ 'show': showMenu }" data-bs-backdrop="static"
      tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
      <div class="offcanvas-header div-title-lm">
        <h5 class="offcanvas-title" id="staticBackdropLabel">Menu</h5>
        <button type="button" class="btn-close btn-close-lateral-menu" @click="toggleMenu" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <ul class="mynav nav nav-pills flex-column mb-auto">
          <li class="nav-item mb-1"><router-link to="/Index"><i class="fa fa-indent font-icon-list"></i>
              Dashboard</router-link></li>
          <li class="nav-item mb-1"><router-link to="/AdmSong"><i class="fa fa-music font-icon-list"
                aria-hidden="true"></i> Canciones</router-link></li>
          <li class="nav-item mb-1"><router-link to="/AdmCategory"><i class="fa fa-folder-open font-icon-list"
                aria-hidden="true"></i> Categorías</router-link></li>
        </ul>
      </div>
    </div>
    <!--content of page profile-->
    <div class="element-category">
      <label class="title-label">Perfil de Usuario</label>
      <div class="profile">
        <div class="profile-header">
          <h1>Nombre de Usuario: {{ name }}</h1>
          <p>Correo electronico: {{ email }}</p>
          <img src="../assets/img/avatar.png" alt="Avatar" class="avatar">
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      showMenu: false,
      email: '',
      name: '',
      id: '',
      img: ''
    };
  },
  created() {
    /*obtain data of localStorage charged in the loging successgfull*/
    this.email = localStorage.getItem('email');
    this.name = localStorage.getItem('name');
    this.id = localStorage.getItem('id');
    this.img = '@/assets/img/avatar.png'/*use a image for all users*/
  },
  methods: {
    /*open-close lateral menu*/
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    /*navigate page Profile*/
    goProfile() {
      this.$router.push({ name: 'Profile' });
    },
    /*close authentication and clear localstorage*/
    closeSession() {
      document.isAuthenticated = false;
      localStorage.clear();
      this.$router.push({ name: 'Login' });
    }
  }
};
</script>

<style scoped>
.col-profile {
  text-align: right;
}

.hearder_col {
  background-color: #000000;
  color: #fff;
}

header {
  padding: 10px;
}

.div-title-lm {
  background-color: #383838;
}

.btn-close-lateral-menu {
  color: #fff;
}

button {
  margin-top: 10px;
}

.btn-menu {
  color: #fff;
}

.lateral-menu {
  background-color: #0f0f0f;
}

.list-group-item {
  cursor: pointer;
}

.list-group-item:hover {
  background-color: #1a75d1;
}

.text-light {
  color: #fff !important;
}

.colum_menu {
  background-color: aqua;
  align-items: center;
}


.mynav li a {
  color: #fff;
  text-decoration: none;
  width: 100%;
  display: block;
  border-radius: 5px;
  padding: 8px 5px;
}

.mynav li a.active {
  background: rgba(255, 255, 255, 0.2);
}

.mynav li a:hover {
  background: rgba(255, 255, 255, 0.2);
}

.mynav li a i {
  width: 25px;
  text-align: center;
}

.notification-badge {
  background-color: rgba(255, 255, 255, 0.7);
  float: right;
  color: #222;
  font-size: 14px;
  padding: 0px 8px;
  border-radius: 2px;
}

.element-category {
  width: 90%;
  margin: 2% auto;
  padding: 10px;
  box-shadow: 4px 4px 4px 1px rgba(0, 0, 0, 0.2);
}

.title-label {
  font-size: 20px;
  font-weight: bold;
  text-shadow: 20px 15px 7px rgba(0, 0, 0, 0.2);
}

.dark-table {
  margin-top: 2%;
  background-color: #343a40;
  color: #353535;
  text-align: center;
}

.dark-table th {
  color: #fff;
}

.dark-table th,
.dark-table td {
  border-color: #00000054;
}

.dark-table th {
  background-color: #3f3f3f;
}

.dark-table tbody tr:nth-of-type(odd) {
  background-color: #454d55;
}

.dark-table tbody tr:hover {
  background-color: #5a6268;
}

.profile {
  margin: 20px;
}

.profile-header {
  text-align: center;
}

.avatar {
  width: 25%;
  height: 50%;
  border-radius: 50%;
  margin-top: 20px;
}
</style>