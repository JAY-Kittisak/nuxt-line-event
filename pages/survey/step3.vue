<template>
  <div>
    <v-app-bar color="primary" dense flat dark>
      <v-toolbar-title> Survey </v-toolbar-title>
    </v-app-bar>
    <v-container class="pt-0 pb-0">
      <v-row>
        <v-col cols="12">
          <div class="mt-12 text-primary text-title text-center">
            Step 3 of 3
          </div>
        </v-col>
        <v-row justify="center">
          <v-col cols="10">
            <h3 class="text-center mt-4">
             Finally, would you <br />
             recommend our event to a <br />
             friend?
            </h3>
          </v-col>
          <v-col cols="11">
            <div class="select" :class="form.survey3 == 1 ? 'active':''" @click="form.survey3 = 1">
              <h1>Of course!</h1>
              <p>Definitely i'll join next event.</p>
              <v-icon>check</v-icon>
            </div>
            <div class="select" :class="form.survey3 == 2 ? 'active':''" @click="form.survey3 = 2">
              <h1>Not sure</h1>
              <p>Let me think again next time.</p>
              <v-icon>check</v-icon>
            </div>
            <div class="select" :class="form.survey3 == 3 ? 'active':''" @click="form.survey3 = 3">
              <h1>No, thanks</h1>
              <p>it's not my type.</p>
              <v-icon>check</v-icon>
            </div>
          </v-col>
          <v-col cols="10">
            <div class="set-padding">
              <v-btn
                rounded
                color="primary"
                dark
                class="w-100 my-btn mt-submit"
                @click="submit"
              >
                Submit
              </v-btn>
              <div class="w-100 text-center my-btn text-primary" @click="back">Back</div>
            </div>
          </v-col>
        </v-row>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        survey3: this.$store.getters.getSurvey.survey3,
      },
    };
  },
  methods: {
    submit() {
      this.$store.dispatch('setSurvey',this.form)
      this.$axios.patch(`https://nuex-line-event-default-rtdb.asia-southeast1.firebasedatabase.app/survey/${this.$store.getters.getLine.userId}.json`,
          this.form
        ).then((res) => {
          console.log(res.status)
          this.$router.push('/survey/done')
        }).catch((err) => {
          console.log(err)
        })
    },
    back(){
     this.$router.push('/survey/step2')
    }
  },
}
</script>

<style lang="scss" scoped>
  .select{
    border-bottom: 1px solid #e6e6e6;
    padding-bottom: 25px;
    color: #707070;
    position: relative;
    &.active{
      color: #1a56be;
      .v-icon{
        color: #1a56be;
        display: block;
      }
    }
    h1{
      font-size: 20px;
    }
    p{
      font-size: 18px;
      margin-bottom: 0;
    }
    .v-icon{
      position: absolute;
      right: 0;
      bottom: 25px;
      display: none;
    }
  }
  .select + .select{
    margin-top: 20px;
  }
  .mt-submit{
    margin-top: 50px;
  }
</style>
