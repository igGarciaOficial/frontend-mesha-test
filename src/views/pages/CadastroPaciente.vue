<template>
    <v-container fluid class="container">
        <h1>Cadastro de paciente</h1>
        <v-form class="form" ref="form">

            <v-text-field v-model="name"
                label="Nome" required
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

            <div @click='chooseImageAction' style="cursor: pointer;">
                <img src="../../assets/camera.svg" />
                <span>Adicionar foto</span>
            </div>
            

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
        <ImageCropper :displayButton='false'  :disableUpload='true' ref='image-upload-component' />
    </v-container>
</template>

<script>
import axios from 'axios';
import {mapState} from 'vuex';

import ImageCropper from '@/components/ImageCropper';

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

    components:{
        ImageCropper,
    },

    computed:{
        ...mapState(['serverURLBase'])
    },

    methods: {

        validateEmail: (email) => {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },

        validateForm(){

            return this.name.trim() && (this.phone.length==11) && 
            this.date && this.validateEmail(this.email);
        },

        sendData(){
            if(!this.validateForm()){
                alert('Verifique se todos os campos estão preenchidos');
                return;
            }

            axios.post(this.serverURLBase + 'user/', {
                    name: this.name,
                    email: this.email,
                    phone: this.phone,
                    born:  this.date
                }, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            ).then(res => {
                alert('Paciente criado com sucesso!');
                
                if(this.$refs['image-upload-component'].hasImg()){
                    this.$refs['image-upload-component'].setUserId(res.data.id);
                    this.$refs['image-upload-component'].uploadPhotoToServe();
                }

                this.clearForm();
            }).catch(err => {
                alert('Erro ao cadastrar o paciente: ' + err['ERROR']);
                
            })
        },

        clearForm(){
            this.email = '';
            this.name = '';
            this.born = new Date().toISOString().substr(0, 10);
            this.phone = '';

            this.menu = false;
            this.modal = false;
            this.menu2 = false;
        },

        chooseImageAction(){
            this.$refs['image-upload-component'].toogleModal();
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