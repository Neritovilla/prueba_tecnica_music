<template>
    <div class="container">
      <div class="row justify-content-center mt-5">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header card_login">
              <h3 class="mb-0">Ingreso</h3>
            </div>
            <div class="card-body">
              <form @submit.prevent="login">
                <div class="mb-3">
                  <label for="email" class="form-label">Correo</label>
                  <input type="text" id="email" v-model="User.email" class="form-control">
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Contraseña</label>
                  <input type="password" id="password" v-model="User.password" class="form-control">
                </div>
                <div class="mb-3 btn_accion">
                  <button type="submit" class="btn btn-primary">Ingresar</button>
                </div>                
                <div class="mb-3 link_to">
                  <p>Si no posees una cuenta<router-link to="/register" class="btn link_text"><b><u>Registrate aquí</u></b></router-link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="app">
      {{ info }}
    </div>

  </template>
  
  
  <script>
import axios from 'axios';

  export default {
    data() {
      return {
        info: null,
        User: {
          "email": "",
          "password": "",
        }
      };
    },
    methods: {

      login() {

        let email = this.User.email;
        let password = this.User.password;
        axios.post('http://127.0.0.1:8000/api/login', {
              "email": email,
              "password": password,
            })
            .then(response => {
              if (response.data.status === true) {
                alert("Inicio de sesión exitoso");                
                /*save data name in local storage*/
                this.saveLocalStorage(email,password);
                this.$router.push({ name: 'Index' });
              } else {
                alert("Inicio de sesión fallido");
              }
            })
            .catch(error => {
              console.error('Error al enviar la solicitud:', error);
              alert("Credenciales incorrectas para iniciar sesion");
            });

      },
      async saveLocalStorage(email,password){
        document.isAuthenticated = true;
        try {
                    const response = await axios.post('http://127.0.0.1:8000/api/user', {
                      "email" : email,
                       "password" : password
                    });
                    this.user = response.data;  
                    localStorage.id = this.user.user.id; 
                    localStorage.name = this.user.user.name;
                    localStorage.email = this.user.user.email;                    
                } catch (error) {
                    console.error('Error al obtener las canciones por categoría:', error);
                }
      }
    }
  };
  </script>
  

  <style>

  .btn_accion{
    text-align: center;
  }

  .link_to{
    text-align: center;
    margin-top: 1%; 
    margin-bottom: 0%;
  }

  .card_login {
    background-color: #1a75d1;
  }

  </style>