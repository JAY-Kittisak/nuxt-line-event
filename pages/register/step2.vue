<template>
  <div>
    <v-app-bar color="primary" dense flat dark>
      <v-toolbar-title> Register </v-toolbar-title>
    </v-app-bar>
    <v-container class="pt-0 pb-0">
      <v-row>
        <v-col cols="12">
          <div class="mt-10 text-primary text-title text-center">
            Step 2 of 2
          </div>
        </v-col>
        <v-col cols="12">
          <v-form>
            <p class="text-center text-main mb-0 mt-4">Tell us more a bit..</p>
            <v-text-field
              v-model="form.email"
              type="email"
              dense
              :rules="emailRules"
              label="Email"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.phone"
              type="tel"
              dense
              :rules="phoneRules"
              @keypress="onlyNumber($event,10)"
              label="Phone"
              required
            ></v-text-field>
            <v-dialog
        ref="dialog"
        v-model="modal"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="form.birthday"
            label="Birthday"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
            class="set-birthday"
          ></v-text-field>
        </template>
        <v-date-picker
          :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
          v-model="form.birthday"
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="modal = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.dialog.save(form.birthday)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>
             <p class="text-center text-main mb-0 mt-4">Work Profile</p>
             <v-text-field
              v-model="form.company"
              dense
              label="Company"
              required
            ></v-text-field><v-text-field
              v-model="form.position"
              dense
              label="Position"
              required
            ></v-text-field>
            <v-btn
              rounded
              color="primary"
              dark
              class="w-100 mt-10 my-btn btn-reg"
              @click="register"
            >
              Register
            </v-btn>
            <div class="w-100 text-center my-btn text-primary" @click="back">Back</div>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
const REGEX_EMAIL = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const REGEX_PHONE = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
const REGEX_NUMBER = /^[0-9]$/
export default {
  data(){
    return {
      form: {
        email: this.$store.getters.getRegister.email,
        phone: this.$store.getters.getRegister.phone,
        birthday: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        company: this.$store.getters.getRegister.company,
        position: this.$store.getters.getRegister.position,
      },
      modal: false,
      emailValidated: false,
      phoneValidated: false,
      emailRules: [ value => this.emailValidator(value)],
      phoneRules: [ value => this.phoneValidator(value)],
    }
  },
  methods: {
    phoneValidator(value){
      this.phoneValidated = false
      if(value == ''){
        return 'required'
      }
      if(REGEX_PHONE.test(value) && value.length == 10){
        this.phoneValidated = true
        return true
      }
      return "please input phone number"
    },
    emailValidator(value){
      this.emailValidated = false
      if(value == ''){
        return 'required'
      }
      if(REGEX_EMAIL.test(value)){
      this.emailValidated = true
        return true
      }
      return "email is invalid"
    },
    onlyNumber(event,max){
      if(event.target.value.length == 0){
        if(event.key != 0){
          return event.preventDefault()
        }
      }else{
        if(!REGEX_NUMBER.test(event.key) || event.target.value.length == max){
          return event.preventDefault()
        }
      }
    },
    validate() {
      let validated = true;
      let errors = [];
      const validatorField = [
        "email",
        "phone",
        "company",
        "position",
        ];
      validatorField.forEach((field) => {
        if (this.form[field] == "") {
          validated = false;
          errors.push(`${field} can not be null`)
        }
      });
      if(!this.phoneValidated){
          validated = false;
          errors.push(`email is invalid`)
      }
      if(!this.emailValidated){
          validated = false;
          errors.push(`please input phone number`)
      }
      if(!validated){
        this.$store.dispatch('setDialog',{
          isShow: true,
          title:'Form is error',
          message: errors.map((err) => err+'<br/>').join('')
        })
      }
      return validated;
    },
    back(){
      this.$router.push('/register')
    },
    register() {
      if(this.validate()){
        this.$store.dispatch('setRegister',this.form)
        this.$axios.patch(`https://nuex-line-event-default-rtdb.asia-southeast1.firebasedatabase.app/members/line:0001/profile.json`,
          this.$store.getters.getRegister
        ).then((res) => {
          console.log(res.status)
          this.$router.push('/register/done')
        }).catch((err) => {
          console.log(err)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.v-form{
  padding: 0 10px;
}
.set-birthday{
  position: relative;
  ::v-deep .v-input__prepend-outer{
    position: absolute;
    right: 0;
  }
}
</style>
