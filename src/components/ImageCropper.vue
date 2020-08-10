<template>
    <div>
        <button v-if="displayButton" @click="toogleModal">open dialog</button>

        <div v-show="showModal" class="backgroud">
            <div class="modal">
                <div>
                    <span class='close-button' @click="toogleModal">x</span>
                    <h2> Atualize sua foto </h2>
                </div>

                <div class='img-content'>
                    
                    <img v-show="showDefaultImg"   ref='img-default'   :src="photoUserSource"  class="img-display" />
                    <img v-show="!showDefaultImg"  ref='img-atualizado'   class="img-display" />
                    
                </div>
                <div class='div-buttons'>
                    <button class='buttonPickerImg' @click="openChoiceBoxFile">Escolher imagem</button>
                    <button class='buttonGuard' v-if="disableUpload" @click="toogleModal"> Guardar </button>
                    <button class='buttonUpload' v-if="!disableUpload" @click="uploadPhotoToServe">Upload</button>
                </div>

                <form enctype='multipart/form-data' method="POST">
                    <input type='file' class='hidden' name='image' @change="fileChanged" ref='inputFile' />
                </form>
            </div>
        </div>

    </div>

</template>

<script>
    import axios from 'axios';
    import { mapState } from "vuex"
    export default {

        data:()=>(
            {
                showModal: false,
                showDefaultImg: true,
                userId: null,
                selectedPhoto: null
            }
        ),

        props: {
            displayButton: {
                type: Boolean,
                default: true
            },

            disableUpload: {
                type: Boolean,
                default: false
            }
        },

        methods: {
            toogleModal(){
                this.showModal = !this.showModal;
                if(!this.showModal)
                    this.showDefaultImg = true;
            },

            setUserId(userId){
                this.userId = userId;
            }, 

            hasImg(){
                return this.selectedPhoto != null;
            },

            uploadPhotoToServe(){
                const formData = new FormData();
                const imageFile = this.selectedPhoto;
                formData.append('avatar', imageFile);

                axios.post(this.serverURLBase + `user/imgUserUpload/${this.userId}`, formData, {
                    headers : {
                        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
                    }
                }).then(res => {
                    console.log(res.config);
                    alert('Upload feito com sucesso.');
                }).catch(err => {
                    alert('Erro ao realizar upload.');
                    console.log(err);
                })
            },

            fileChanged(event){
                this.selectedPhoto = event.target.files[0];
                let reader = new FileReader();
                
                reader.addEventListener('load', function(){
                    this.$refs['img-atualizado'].src = reader.result;
                    this.showDefaultImg = false;
                }.bind(this));

                reader.readAsDataURL(this.selectedPhoto)
            }, 

            openChoiceBoxFile(){
                this.$refs['inputFile'].click();
            }


        },

        computed:{
            ...mapState(["photoUserSource", "serverURLBase"]),
        },

    }
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .backgroud{
        background-color: #616c75;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 90vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .buttonUpload{
        background-color: #1f8d9c;
        color: #ffffff;
        padding: 7px 15px;
        border-radius: 5px;
        position: relative;
        bottom: 10px;
        margin-top: 15px;
    }
    .buttonGuard{
        background-color: #0ea14e;
        color: #ffffff;
        padding: 7px 15px;
        border-radius: 5px;
    }

    .buttonPickerImg{
        background-color: #687475;
        color: #ffffff;
        padding: 7px 15px;
        border-radius: 5px;
        position: relative;
        bottom: 10px;
        margin-top: 15px;
    }

    .close-button{
        padding: 3px 10px;
        border: 1px solid gray;
        border-radius: 100%;
        float: right;
    }

    .close-button:hover{
        cursor: pointer;
        background-color: gray;
        color: #ffffff;
    }

    .div-buttons{
        display: flex;
        justify-content: space-between;
    }

    .img-content{
        height: 80%;
        display: flex;
        justify-content: center;
        padding: 30px 0;
    }

    .img-content-img-container{
        display: block;
    }

    .img-display{
        width: auto;
        min-width: 70%;
        max-height: 100%;
    }

    .hidden{
        display: none;
    }

    .modal{
        background-color: #ffffff;
        width: 60%;
        height: 75vh;
        margin: auto;
        overflow: auto;
        padding: 20px;
    }
    
    @media screen and (orientation: portrait){
        .modal{
            background-color: #ffffff;
            width: 90%;
            height: 80vh;
            margin: auto;
            overflow: auto;
            padding: 15px;
        }
    }
</style>