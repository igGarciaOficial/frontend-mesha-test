<template>
    <v-container fluid class="container">
        <h1>Cadastro de paciente</h1>
        <v-form class="form" ref="form">

            <v-text-field v-model="name"
                label="Name" required
            ></v-text-field>

            <v-text-field
                v-model="email"
                label="E-mail" required
                type="email"
            ></v-text-field>

            <v-text-field
                v-model="phone"
                label="Telefone" required
                type="number"
            ></v-text-field>

            
    <v-col cols="12" sm="6" md="4">
      <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="date"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Data de nascimento"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
        </v-date-picker>
      </v-dialog>
    </v-col>
            

            <v-btn
                color="success"
                class="mr-4"
                @click="sendData"
            >
                Cadastrar
            </v-btn>

            <v-btn color="error" class="mr-4" @click="clearForm" >
                Limpar formulário
            </v-btn>
        </v-form>
    </v-container>
</template>

<script>

export default {
    name: 'Cadastro-de-paciente',

    data: () => {
        return {
            email: '',
            name: '',
            phone: '',

            date: new Date().toISOString().substr(0, 10),
            menu: false,
            modal: false,
            menu2: false,

        }
    },

    methods: {
        validateForm(){},

        sendData(){},

        clearForm(){
            this.email = '';
            this.name = '';
            this.born = new Date().toISOString().substr(0, 10);
            this.phone = '';

            this.menu = false;
            this.modal = false;
            this.menu2 = false;
        }
    }
}

</script>

<style scoped>

    .container{
        padding: 30px;
    }

    .form{
        margin: auto;
    }
</style>