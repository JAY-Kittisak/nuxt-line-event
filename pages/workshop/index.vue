<template>
  <div>
    <v-app-bar color="primary" dense flat dark>
      <v-toolbar-title> Register Workshop </v-toolbar-title>
    </v-app-bar>
    <v-container class="pt-0 pb-0">
      <v-row>
        <v-col cols="12">
          <div class="mt-6 text-primary text-title text-center">
            {{list.date}}
          </div>
        </v-col>
        <v-col cols="12">
          <Card
            v-for="item in list.sessions"
            :session="item"
            :key="item.id"
            :active="selectedWorkshop.includes(item.id)"
            v-on:moreDetail="moreDetail(item)"
            v-on:chooseWorkshop="chooseWorkshop(item)"
          />
        </v-col>
        <v-col cols="12">
          <div class="set-padding">
            <v-btn
              rounded
              color="primary"
              dark
              class="w-100 mt-3 my-btn"
              @click="next"
            >
              Next
            </v-btn>
            <div v-if="index > 0" class="w-100 mt-3 text-center my-btn text-primary" @click="back">Back</div>
          </div>
        </v-col>
      </v-row>
      <v-dialog v-model="isShowDialog" max-width="290">
        <v-card class="dialog-card">
          <v-img
            class="white--text align-end"
            height="200px"
            :src="dialog.image"
          >
          </v-img>
          <v-card-title class="text-h5">{{dialog.title}}</v-card-title>
          <v-card-text>
            <p>Time: {{dialog.time}}</p>
            <p>Place: {{dialog.place}}</p>
            <p class="detail">
              {{dialog.detail}}
            </p>
            <p>
              Speaker: <br/>
              <span v-html="dialog.spakers"></span>
            </p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#1a56be" text @click="isShowDialog = false"> OK </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import Card from '~/components/Card.vue'
export default {
  components: {
    Card
  },
  data() {
    return {
      isShowDialog: false,
      index: 0,
      dialog:{
        title: '',
        time: '',
        place: '',
        image: '',
        detail: '',
        spakers: ''
      },
      selectedWorkshop: [],
      list: [],
      workshops: this.$store.getters.getWorkshop
    };
  },
  mounted(){
    //api
    this.list = this.workshops[this.index]
  },
  methods: {
    back(){
      this.index = this.index - 1
      this.list = this.workshops[this.index]
    },
    next() {
      if(this.index == this.workshops.length - 1){
        this.$axios.patch(`https://nuex-line-event-default-rtdb.asia-southeast1.firebasedatabase.app/workshops/${this.$store.getters.getLine.userId}.json`,
          {...this.selectedWorkshop}
        ).then((res) => {
          console.log(res.status)
          this.$router.push('/workshop/done')
        }).catch((err) => {
          console.log(err)
        })
      }else {
        this.index = this.index+1
        this.list = this.workshops[this.index]
      }
    },
    moreDetail(item) {
      this.isShowDialog = true
      this.dialog = item
    },
    chooseWorkshop(item) {
      const listId = this.list.sessions.map(session => session.id)
      this.selectedWorkshop = this.selectedWorkshop.filter(session => !listId.includes(session))
      this.selectedWorkshop.push(item.id)
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-card {
  p {
    margin-bottom: 0;
  }
  .v-card__title.text-h5 {
    font-size: 20px !important;
  }
  .v-card__text {
    padding-bottom: 0;
  }
  .detail {
    margin: 10px 0;
  }
}
</style>
