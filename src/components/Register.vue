<template>
  <!--form register-->
  <div class="container container_register">
    <div class="row justify-content-center mt-5">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header card_register">
            <h3 class="mb-0"> <router-link to="/login" class="btn"><i>X</i></router-link> Registro</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="register">
              <div class="mb-3">
                <label for="name" class="form-label">Nombre de usuario</label>
                <input type="text" id="name" v-model="User.name" class="form-control">
                <span v-if="!User.name" style="color: red;">Este campo es obligatorio</span>

              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Correo electrónico</label>
                <input type="email" id="email" v-model="User.email" class="form-control">
                <span v-if="!User.email" style="color: red;">Este campo es obligatorio</span>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Contraseña</label>
                <input type="password" id="password" v-model="User.password" class="form-control">
                <span v-if="!User.password" style="color: red;">Este campo es obligatorio</span>
              </div>
              <button type="submit" class="btn btn-primary">Registrarse</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

/*import axios for use http request*/
import axios from 'axios'

export default {
  data() {
    return {
      /*initialize arrays*/
      result: {},
      User: {
        name: '',
        email: '',
        password: '',
      }
    }
  },
  methods: {

    /*validate data and send params for insrt in data base*/
    register() {
      let name = this.User.name;
      let email = this.User.email;
      let password = this.User.password;
      //validate dataof form
      if (name != '' && email != '' && password != '') {
        //validate name and  email if exist en data base
        this.checkData(this.User.name, this.User.email)
          .then(response => {
            if (response == 1) {
              alert('El correo o usaurio ya se encuentran registrados');
            } else {
              axios.post('http://127.0.0.1:8000/api/register',
                {
                  "name": this.User.name,
                  "email": this.User.email,
                  "password": this.User.password
                }
              )
                .then(
                  ({ data }) => {
                    try {
                      if (data.status)
                        alert('Registrado con Exito');
                      this.$router.push({ name: 'Login' })
                    } catch (err) {
                      alert('Error al registrar');
                    }
                  }
                )
            }
          })
          .catch(error => {
            console.error('Error al verificar datos:', error);
          });
      } else {
        alert('Porfavor llene todos los campos');
      }
    },
    /*search if exist registers whit name or email in database*/
    checkData(name, email) {
      return new Promise((resolve, reject) => {
        axios.post('http://127.0.0.1:8000/api/check', {
          "name": name,
          "email": email,
        })
          .then(({ data }) => {
            resolve(data);
          })
          .catch(error => {
            console.error('Error al verificar datos:', error);
            reject(error);
          });
      });
    }
  }
};
</script>

<style scoped>
.container_register {
  margin-top: 2%;
  margin-bottom: 2%;
}

.card_register {
  background-color: #fe5252;
}
</style>