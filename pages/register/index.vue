<template>
  <div>
    <v-app-bar color="primary" dense flat dark>
      <v-toolbar-title> Register </v-toolbar-title>
    </v-app-bar>
    <v-container class="pt-0 pb-0">
      <v-row>
        <v-col cols="12">
          <div class="mt-8 text-primary text-title text-center">
            Step 1 of 2
          </div>
        </v-col>
        <v-col cols="12" class="text-center">
          <v-avatar size="155">
            <img v-if="getLine.pictureUrl == ''"  src="~/assets/catSeal.jpg" alt="" width="155" />
            <img v-else :src="getLine.pictureUrl" alt="" width="155" />
          </v-avatar>
        </v-col>
        <v-col cols="12" class="text-center pt-2 pb-0">{{getLine.displayName}}</v-col>
        <v-col cols="12" class="text-center mt-10 my-btn">
          <v-form>
            <v-text-field
              v-model="form.firstname"
              dense
              label="Firstname"
              required
            >
            </v-text-field>
            <v-text-field
              v-model="form.lastname"
              dense
              label="Lastname"
              required
            >
            </v-text-field>
            <div class="gender-group d-flex mt-3">
              <p>Gender</p>
              <div
                class="circle"
                :class="form.gender == 1 ? 'active' : ''"
                @click="chooseGender(1)"
              >
                <span>ชาย</span>
              </div>
              <p>male</p>
              <div
                class="circle"
                :class="form.gender == 2 ? 'active' : ''"
                @click="chooseGender(2)"
              >
                <span>หญิง</span>
              </div>
              <p>female</p>
            </div>
            <v-btn
              rounded
              color="primary"
              dark
              class="w-100 my-btn btn-reg"
              @click="next"
            >
              Next
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  let errName = [];
  let errLastName = [];
  let errGender = [1];

export default {
  mounted(){
    liff.init({
      liffId: '1656569119-4DE3kwDG'
    }).then(() => {
      if(liff.isLoggedIn()){
        liff.getProfile().then(profile => {
          this.$store.dispatch('setLine',profile);
          console.log(getLine.displayName)
        })
      }else{
        liff.login()
      }
    })
  },
  computed:{
    getLine(){
      return this.$store.getters.getLine;
      // profile: {
      //   pictureUrl: this.$store.getters.getLine.pictureUrl,
      //   displayName: this.$store.getters.getLine.displayName,
      //   userId: this.$store.getters.getLine.userId,
      // },
    }
  },
  data: () => {
    return {
      form: {
        firstname: errName[0] ? errName[errName.length -1]: "",
        lastname: errLastName[0] ? errLastName[errLastName.length -1]:"",
        gender: errGender[0] ? errGender[errGender.length -1]:1,
      },
    };
  },
  methods: {
    chooseGender(gender) {
      this.form.gender = gender;
    },
    validate() {
      let validated = true;
      let errors = [];
      const validatorField = ["firstname", "lastname"];
      validatorField.forEach((field) => {
        if (this.form[field] == "") {
          validated = false;
          errors.push(`${field} can not be null`)
        }
      });
      if(!validated){
        this.$store.dispatch('setDialog',{
          isShow: true,
          title:'Form is error',
          message: errors.map((err) => err+'<br/>').join('')
        })
      }
      return validated;
    },
    next() {
      if (this.validate()) {
        this.$store.dispatch('setRegister',this.form)
        errName.push(`${this.$store.getters.getRegister.firstname}`)
        errLastName.push(`${this.$store.getters.getRegister.lastname}`)
        errGender.push(`${this.$store.getters.getRegister.gender}`)
        this.$router.push("/register/step2");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.v-form {
  padding: 0 20px;
}
.gender-group {
  font-weight: lighter;
  p {
    margin-bottom: 0;
    align-self: center;
    margin-right: 20px;
  }
  .circle {
    width: 45px;
    height: 45px;
    color: #fff;
    border-radius: 50%;
    position: relative;
    background: rgba($color: #000000, $alpha: 0.3);
    margin-right: 7px;
    &.active {
      background: #1a56be;
    }
    span {
      width: 35px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
.btn-reg {
  margin-top: 70px;
}
</style>
