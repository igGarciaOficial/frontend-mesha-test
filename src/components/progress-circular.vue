<template>

        <v-overlay
            :absolute="absolute"
            :value="overlay"
            >

            <span>
                {{message}}
            </span> <br/>
            <v-progress-circular
                :size="65"
                color="primary"
                indeterminate
            ></v-progress-circular>
        </v-overlay>
    

</template>

<script>
    export default {

        data(){
            return{
                overlay: false,
                absolute: false
            }
        },

        props: {
            message: {
                type: String,
                default: 'Aguarde um pouco...'
            }
        },

        methods: {
            toogleOverlay(){
                this.overlay = !this.overlay;
            }
        },

    }
</script>

