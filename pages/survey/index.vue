<template>
  <div>
    <v-app-bar color="primary" dense flat dark>
      <v-toolbar-title> Survey </v-toolbar-title>
    </v-app-bar>
    <v-container class="pt-0 pb-0">
      <v-row>
        <v-col cols="12">
          <div class="mt-12 text-primary text-title text-center">
            Step 1 of 3
          </div>
        </v-col>
        <v-row justify="center">
          <v-col cols="10">
            <h2 class="text-center mt-4">
              How would you rate <br />
              the event overall?
            </h2>
          </v-col>
          <v-col cols="10">
            <v-slider
              class="slider"
              v-model="form.survey1"
              :max="10"
              :min="0"
              thumb-label="always"
            ></v-slider>
            <div class="set-padding">
              <v-btn
                rounded
                color="primary"
                dark
                class="w-100 my-btn mt-200"
                @click="next"
              >
                Next
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  mounted() {
    liff.init({liffId: "1656569119-jzv2rQ3w"})
      .then(() => {
        if (liff.isLoggedIn()) {
           liff.getProfile().then((profile) => {
             this.$store.dispatch("setLine", profile);
           })
        } else {
          liff.login();
        }
      })
  },
  data() {
    return {
      form: {
        survey1: this.$store.getters.getSurvey.survey1
      },
    };
  },
  methods: {
    next() {
      this.$store.dispatch('setSurvey',this.form)
      this.$axios.patch(`https://nuex-line-event-default-rtdb.asia-southeast1.firebasedatabase.app/survey/${this.$store.getters.getLine.userId}.json`,
          this.form
        ).then((res) => {
          console.log(res.status)
          this.$router.push('/survey/step2')
        }).catch((err) => {
          console.log(err)
        })
        this.$router.push('/survey/step2')
    },
  },
};
</script>

<style lang="scss" scoped>
.slider {
  margin-top: 90px;
  ::v-deep {
    .v-slider__thumb {
      width: 15px !important;
      height: 15px !important;
    }
    .v-slider__thumb-label {
      font-size: 20px;
      width: 45px !important;
      height: 45px !important;
    }
    .v-slider__track-background {
      background: rgba($color: #000, $alpha: 0.3) !important;
    }
    .v-slider--horizontal .v-slider__track-background {
      height: 5px;
    }
    .v-slider__track-fill {
      height: 5px;
    }
  }
}
</style>
