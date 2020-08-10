<template>
    <v-container fluid>
        <h1>Importe seu CSV!</h1>
        <hr/>
        <input type='file' @change='fileChange' class='btn-select-file'/>

        <v-divider/>
        <v-spacer/>

        <v-data-table 
            :headers = 'headers'
            :items="desserts"
            :items-per-page="15"
            class="elevation-1"
        />

    </v-container>
</template>

<script>
import Papa from 'papaparse';
export default {

    data(){
        return{
            headers: [],
            desserts: [],

            arquivo: null,
            first: false
        }
    },

    methods: {
        fileChange(event){
            this.arquivo = event.target.files[0];

            Papa.parse(this.arquivo, {
                headers: true,
                step: function(row){
                    //console.log('ROW:', row);
                    this.insertRowInTable(row);
                }.bind(this),

                complete: function(){
                    alert('Dados importados com sucesso!');
                }.bind(this)
            })
        }, 

        insertRowInTable(row){
            let dados = row.data;
            if(!this.first){
                this.first = true;
                dados.map((item, index) => {
                    this.headers.push({
                        text: item,
                        value: index.toString()
                    })
                }) 
            }else{
                let obj = {};

                dados.map((item, index)=>{
                    obj[index.toString()] = item;
                    
                })
                this.desserts.push(obj);
            }
               
            
        }
    },

    computed:{

    }
}

</script>

<style>
    .btn-select-file{
        padding: 7px 15px;
        background-color: #205ba8;
        cursor: pointer;
        /*color: #ffffff;*/
        margin-bottom: 30px;
    }
</style>