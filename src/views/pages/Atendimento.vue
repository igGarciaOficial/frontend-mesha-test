<template>
    <v-content fluid>

        
        <div v-show="initing" class="form">
            <Timer class="timer" ref='cronometro'/>
            <button @click="stopAttendance" class='stop-timer'>Encerrar atendimento</button>

            <v-dividir />
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
                        v-model="selectedCompliantsPatient"
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

                    <v-checkbox v-model="outherProcedures" label="Outro(s) procedimento(s)." />
                    <v-textarea
                        v-show="outherProcedures"
                        outlined
                        v-model = "describeOutherProcedures"
                        name="input-7-4"
                        label="Descreva os procedimentos separandos-os por ponto e vírgula(;)."
                    />
                </v-col>
            </div>
              

        </div>

        <div @click="initAttendance" class="init-attendance-button" v-show="!initing">
            <p> Iniciar <br />atendimento </p>
        </div>

    </v-content>
</template>

<script>
import Timer from '@/components/Timer';
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
            outherComplaints: false,
            outherProcedures: false,

            descriveOutherComplaints:'',
            describeOutherProcedures:'',
        }
    }, 

    computed: {
        itens () {
            return this.avaliablePatients.map(patient => {
                return patient.id + ' - ' + patient.name;
            })
        }, 
    },

    components: {
        Timer, 
    },

    methods: {
        initAttendance(){
            this.$refs['cronometro'].initTimer();
            this.initing = true;
        },

        stopAttendance(){
            this.$refs['cronometro'].stopTimer();
            this.initing = false;
        }
    }
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