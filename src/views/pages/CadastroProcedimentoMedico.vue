<template>
    <v-container fluid class="container">
        <v-col cols='12' lg='10' sm="10" md="8">
            <h1>Área para cadastro de procedimentos médicos</h1>
            <v-form>
            
                <v-text-field v-model="name"
                    label="Nome" required
                />

                <v-textarea 
                    v-model="description"
                    label="Descrição"
                />

                <v-text-field v-model="price"
                    label="Preço" required
                    type='number'
                />

                <v-col cols="11" sm="8">
                    <v-menu
                        ref="menu"
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="time"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="time"
                            label="Quanto tempo leva o procedimento? (HH:MM)"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                        </template>
                        <v-time-picker
                        v-if="menu2"
                        v-model="time"
                        full-width
                        @click:minute="$refs.menu.save(time)"
                        ></v-time-picker>
                    </v-menu>
                </v-col>
                <v-row>
                    <v-btn color='indigo' style='color: white;' @click='saveData'> Cadastrar </v-btn> <v-spacer/>
                    <v-btn style="background-color: red; color: white;" @click='clearForm'> Limpar formulário </v-btn>
                </v-row>
            </v-form>
        </v-col>


    </v-container>
</template>

<script>
import axios from 'axios';
import {mapState} from 'vuex';

export default {
    
    data(){
        return{
            name:'',
            price:'',
            description:'',

            time: null,
            menu2: false,
            modal2: false,
        }
    },
    computed: {
        ...mapState(['serverURLBase'])
    },
    methods: {
        clearForm(){
            this.name ='';
            this.price ='';
            this.description ='';
            this.time = null;
            this.menu2 = false;
            this.modal2 = false;
        },

        validateForm(){
            return this.name.trim() && this.price && this.time;
        },

        saveData(){
            if(!this.validateForm){
                alert('Verifique todas as informações do formulário');
                return;
            }
            let data = {
                'name': this.name, 
                'price': this.price,
                'description': this.description,
                'duration': this.time + ':00'       //Formato HH:MM:SS
            };

            axios.post(this.serverURLBase + 'procedures/new', data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(res => {
                alert('Procedimento criado com sucesso');
                console.log(res.data.id);
                this.clearForm();
            }).catch(err => {
                alert('Ocorreu algum erro ao criar procedimento');
                console.log(err);
            })
        },
    },
}
</script>