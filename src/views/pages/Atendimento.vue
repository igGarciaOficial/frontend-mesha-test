<template>
    <v-content fluid>

        
        <div v-show="initing" class="form">
            <Timer class="timer" ref='cronometro'/>
            <button @click="stopAttendance" class='stop-timer'>Encerrar atendimento</button>

        <div>
            <span> Conta realizada (R$): {{bucket_user}} </span>
        </div>
            
            <div>
                <v-col cols='12' md='10'>
                    <v-autocomplete
                        v-model="selectedPatient"
                        :items="avaliablePatients"
                        dense
                        item-text="email"
                        item-value="id"
                        filled
                        label="Pacientes"
                    ></v-autocomplete>
                    <span>
                        A busca do paciente se dá pelo e-mail, visto que é um campo único e conhecido pelo paciente e possivelmente pelo funcionário.
                    </span>
                </v-col>
                <v-col cols='12' md='10'>
                    <v-autocomplete
                        v-model="selectedCompliantsPatient"
                        :items="complaints"
                        dense
                        item-text="description"
                        item-value="id"
                        chips
                        small-chips
                        label="Queixas"
                        color="warning"
                        multiple
                        solo
                    ></v-autocomplete>
                    <v-checkbox v-model="outherComplaints" label="Outra(s) queixa(s)" />
                    <v-textarea
                        v-show="outherComplaints"
                        outlined
                        v-model="descriveOutherComplaints"
                        name="input-7-4"
                        label="Descreva as queixas separandos-as por ponto e vírgula(;)."
                    />
                </v-col>

                <v-col cols='12' md='10'>
                    <v-autocomplete
                        v-model="selectedProceduresPatient"
                        :items="procedures"
                        dense
                        item-text="name"
                        item-value="id"
                        chips
                        
                        label="Procedimentos médicos"
                        color="green-light"
                        multiple
                        outlined
                    ></v-autocomplete>

                </v-col>
            </div>
              

        </div>

        <div @click="initAttendance" class="init-attendance-button" v-show="!initing">
            <p> Iniciar <br />atendimento </p>
        </div>

        <ProgressCircle ref='progress-component' message="Aguarde um momento. Estamos gerando o relatório."/>
    </v-content>
</template>

<script>
import Timer from '@/components/Timer';
import ProgressCircle from '@/components/progress-circular';

import axios from 'axios';

import generatePDF from '../../utils/generateRelatorio.js';
import BuscaBinaria from '@/utils/BuscaBinaria.js';
import { mapState } from 'vuex';
export default {
    data(){
        return {
            initing: false,
            
            avaliablePatients: [
                {id: 1, name:'Carlos', email:'carlos@email.com'},
                {id: 2, name:'Pedro', email:'pedro@email.com'},
                {id: 3, name: 'Bruna', email:'bruna@email.com'}
            ],

            complaints: [
                {id: 1, description: 'Dor de cabeça'},
                {id: 2, description: 'Dor de estômago'}
            ],

            procedures : [
                {id:1, name:'Exame de sangue'},
                {id:2, name:'Tumorgrafia'},
                {id:3, name:'Ressonância magnética'}
            ],

            selectedPatient: null,
            selectedCompliantsPatient: [],
            selectedProceduresPatient: [],
            outherComplaints: false,

            descriveOutherComplaints:'',

            timerInfoData: {},
            atendimentoId: null,
            bucket_user: 0,
            lastLengthProcedures : 0
        }
    }, 

    mounted(){

        // Recuperando usuarios do tipo paciente;

        axios.get(this.serverURLBase + 'patient/').then(res => {
            this.avaliablePatients = res.data.data.data;
        }).catch(err => {
            alert('Erro ao recuperar dados de pacientes');
            console.log('Error:', err);
            this.avaliablePatients = [];
        });

        // Recuperando queixas ...
        axios.get(this.serverURLBase + 'complaints')
        .then(res => {
            this.complaints = res.data.data;
        }).catch(err =>{
            console.log(err);
        })

        //Recuperando procedimentos
        axios.get(this.serverURLBase + 'procedures')
        .then(res => {
            this.procedures = res.data.data;
        }).catch(err => {
            console.log(err);
        })
    },

    computed:{
        ...mapState(['serverURLBase'])
    },

    components: {
        Timer, 
        ProgressCircle
    },

    methods: {
        initAttendance(){
            this.$refs['cronometro'].initTimer();
            this.initing = true;
        },

        getDataToGenerateRelatorio(){
            axios.get(this.serverURLBase + `user/profile/${this.selectedPatient}`)
            .then(result => {
                let response = result.data;
                let complaints2 = this.descriveOutherComplaints.split(';');

                //generatePDF(nome, email, telefone, queixas = [], procedimentos = [], tempoAtendimento='00:00:00', 
                // dataAtendimento='01/01/2020', idAtendimento, idPaciente, tempoProcedimentos);

                axios.get(this.serverURLBase + `attendance/${this.atendimentoId}`).then(res => {

                    this.$refs['progress-component'].toogleOverlay();
                    this.initing = false;

                    
                    generatePDF(response.name, response.email, response.phone, 
                        this.selectedCompliantsPatient.concat(complaints2), 
                        this.selectedProceduresPatient, this.timerInfoData.duration, 
                        this.timerInfoData.init, response.id, this.selectedPatient, res.data.proceduresTime
                    );
                });
                

            }).catch(err => {
                this.$refs['progress-component'].toogleOverlay();
                this.initing = false;
                alert('Erro ao recuperar informações do usuário');
                console.log(err);
            });
        },

        stopAttendance(){
            let encerrarAtendimento = confirm(`Você realmente deseja finalizar o atendimento?`);
            if (encerrarAtendimento){
                this.$refs['cronometro'].stopTimer();
                this.timerInfoData = this.$refs['cronometro'].getCurrenteData();

                this.$refs['progress-component'].toogleOverlay();
                
                axios.post(
                    this.serverURLBase + `attendance`,  
                    {
                        "inited": this.timerInfoData.init, 
                        "finished": this.timerInfoData.finish,
                        "patient": this.selectedPatient,
                        "employeer": '2',
                        complaints: this.selectedCompliantsPatient,
                        procedures: this.selectedProceduresPatient,
                        outherComplaints: this.descriveOutherComplaints.split(';')
                    }, 
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }
                )
                .then(res => {
                    console.log('Atendimento salvo com sucesso!', res.data.id);
                    this.atendimentoId =res.data.id;
                    this.getDataToGenerateRelatorio();
                })
                .catch(err => {
                    this.$refs['progress-component'].toogleOverlay();
                    this.initing = false;
                    alert('Erro ao salvar atendimento.');
                    console.log(err);
                });

            }
        }
    },

    watch: {
        selectedProceduresPatient: function(){
            if (!this.selectedProceduresPatient.length){
                this.bucket_user = 0;
                return;
            }

            let operacaoSoma = this.lastLengthProcedures < this.selectedProceduresPatient.length

            this.selectedProceduresPatient.map(item => {
                //lista, valorAlvo, saoObjetos=false, indiceObjeto=null
                let result = BuscaBinaria(this.procedures, item, true, 'id');
                let price = Number.parseFloat(this.procedures[ result ].price);
                if(operacaoSoma)
                    this.bucket_user += price;
                else 
                    this.bucket_user -= price;
            });

            this.lastLengthProcedures = this.selectedProceduresPatient.length;
        }
    },
}

</script>

<style scoped>
.form{
   /* margin-top: -100px;*/
    margin-left: -20%;
    /*display: flex;
    flex-direction: row;
    align-items: flex-start; */
    overflow: auto;
}

.init-attendance-button{
    width: 170px;
    height: 170px;
    background-color: #1f5adb;
    background-image: radial-gradient(#267fde, #1f5adb);
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
}
.init-attendance-button>p{
    text-align: center;
}
.init-attendance-button:hover{
    filter: brightness(0.80);
}

.timer{
    position: fixed;
    top: 100px;
    right: 100px;
}

.stop-timer{
    background-color: #ff0000;
    position: fixed;
    top: 100px;
    left: 20%;
    color: white;
    font-weight: bold;
    padding: 5px 10px; 
}

</style>