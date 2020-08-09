<template>
  <v-container fluid class="down-top-padding">
    <v-row>
      <v-col lg="12">
        <v-card>
          <v-card-text class="text-center pa-7">
            <img
              
              :src="photoUserSource"
              alt="user"
              width="150px"
              class="img-fluid rounded-circle shadow-sm"
            />
            <img src="../../assets/camera.svg" class='editIcon' @click='openFilesSystem' />

            <h4 class="mt-2 title blue-grey--text text--darken-2 font-weight-regular">{{UserName}}</h4>
          </v-card-text>
        </v-card>
        
        <ImageCropper :displayButton="false" ref='img-cropper-component'/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ImageCropper from '@/components/ImageCropper';
import { mapState } from "vuex"

export default {
  name: "Profile",

  methods: {
    openFilesSystem(){
      this.$refs['img-cropper-component'].toogleModal();
    }
  },

  computed:{
    ...mapState(["UserName", "photoUserSource"]),
  },

  components: {
    ImageCropper,
  }
};
</script>

<style scoped>

  .editIcon{
    position: relative;
    left: -30px;
    top: -5px;
    cursor: pointer;
  }

  .hidden{
    display: none;
  }

</style>