<template>
  <div>
    <v-app-bar color="primary" dense flat dark>
      <v-toolbar-title> Survey </v-toolbar-title>
    </v-app-bar>
    <v-container class="pt-0 pb-0">
      <v-row>
        <v-col cols="12">
          <div class="set-padding">
            <div class="text-center mt-16">
              <img src="~/assets/logo-jsr.png" alt="" width="236px" />
              <h1 class="text-title mt-10">Thank you</h1>
              <p class="mt-10">
                thanks for completing this survey,<br />
                your feedback will help us improve the.<br />
                next event.
              </p>
            </div>
            <div
              class="w-100 text-center my-btn outlined text-primary mt-200"
              @click="close"
            >
              Close
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  methods: {
    workshop() {
      this.$router.push("/workshop");
    },
    close() {
      liff.closeWindow();
    },
  },
};
</script>
