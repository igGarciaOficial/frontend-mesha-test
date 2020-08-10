<template>
  <v-container fluid class="down-top-padding">
    <v-row>
      <v-col cols="12" lg="6">
          <!--h1 style="margin-bottom: 10px;">Atendimentos</h1-->
          <v-row justify="center">
            <v-col lg="8">
              <v-card :shaped='true' elevation="10" class='cards' color='primary' :dark='true' style='margin:auto;'>
                <v-card-title>
                  <span class='addButton' @click="goToPath('/attendance/new')"></span>
                  Atendimentos realizados
                </v-card-title>
                <v-card-text class='big-number'>
                  {{atendimentosRealizados}}
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col lg="8">
              <v-card :shaped='true' elevation="10" class='cards' color='default' :dark='true' style='margin:auto;'>
                <v-card-title>
                  <span class='addButton' @click="goToPath('/create-patient')"></span>
                  Pacientes cadastrados
                </v-card-title>
                <v-card-text class='big-number'>
                  {{pacientesCadastrados}}
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          
          <v-row justify="center">
            <v-col lg='8'>
              <v-card elevation="10" :shaped='true' class='cards' color='warning' :dark='true' style='margin:auto;'>
                <v-card-title>
                  <span class='addButton'></span>
                  Procedimentos médicos
                </v-card-title>
                <v-card-text class='big-number'>
                  {{procedimentosCadastrados}}
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col lg='8'>
              <v-card elevation="10" :shaped='true' class='cards' color='secundary' :dark='true' style='margin:auto;'>
                <v-card-title>
                  <span class='addButton'></span>
                  Queixas
                </v-card-title>
                <v-card-text class='big-number'>
                  {{ queixasRegistradas }}
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

      </v-col>

      <v-col cols="12" lg="6">
          <h1>Meus eventos</h1>
          <v-sheet height="350">
            <v-calendar 
              :dark='true' 
              event-color="primary"
              color='primary'
            />
          </v-sheet>

      </v-col>

    </v-row>
  </v-container>
</template>


<script>
import axios from 'axios';
import {mapState} from 'vuex';

export default {
  name: "BasicDashboard",
  data: () => ({
    events: [],

    atendimentosRealizados: 0,
    pacientesCadastrados: 0,
    procedimentosCadastrados: 0,
    queixasRegistradas: 0,

  }),
  computed: {
    ...mapState(['serverURLBase'])
  },
  mounted(){

    // Get total de atendimentos
    axios.get(this.serverURLBase + 'attendance/')
    .then(res => {
      this.atendimentosRealizados = res.data.total;
    }).catch(err => {
      alert('Erro ao coletar atendimentos')
      console.log(err);
    });

    // Get procedimnetos
    axios.get(this.serverURLBase + 'procedures/')
    .then(res => {
      this.procedimentosCadastrados = res.data.total;
    }).catch(err => {
      alert('Erro ao coletar procedimentos');
      console.log(err);
    });

    //Get patientes
    axios.get(this.serverURLBase +  'patient/')
    .then(res => {
        this.pacientesCadastrados = res.data.data.total;
      })
    .catch(err => {
      alert('Erro ao coletar pacientes');
      console.log(err);
    });

    axios.get(this.serverURLBase + 'complaints/')
    .then(res => {
      this.queixasRegistradas = res.data.total
    })
    .catch(err => {
      alert('Erro ao coletar queixas');
      console.log(err);
    })


  },

  methods: {
    goToPath(route){
      this.$router.replace(route);
    }

  }
};
</script>

<style scoped>

  .cards{
    min-height: 100px;
  }

  .big-number{
    font-size: 36px;
    text-align:center;
  }

  .addButton{
    position: relative;
    cursor: pointer;
    margin-right: 10px;
  }

  .addButton::before{
    content: '+';
  }

  .addButton:hover{
    filter: brightness(1.3);
    /*background-color:#307fc9;
    border: 1px solid #1b42ab;*/
  }

</style>