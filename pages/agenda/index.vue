<template>
  <div>
    <v-app-bar color="primary" dense flat dark>
      <v-toolbar-title> Agenda </v-toolbar-title>
    </v-app-bar>
    <v-sheet elevation="6">
      <v-tabs grow v-model="tab">
        <v-tab v-for="item in agenda" :key="item.date">
          {{ item.date }}
        </v-tab>
      </v-tabs>
    </v-sheet>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in agenda" :key="item.date">
        <v-container class="pt-0">
          <v-row>
            <v-col
              cols="12"
              v-for="session in item.sessions"
              :key="session.title"
            >
              <v-card
                class="agenda-card"
                :class="session.type == 'set' ? 'card-set' : ''"
              >
                <v-card-text v-if="session.type != 'set' ? 'card-set' : ''">
                  <p class="time mb-2">{{ session.time }}</p>
                  <v-row>
                    <v-col cols="4" class="text-center pt-2 pb-0">
                      <img :src="session.image" alt="" class="agenda-image" />
                    </v-col>
                    <v-col cols="8" class="pt-2 pb-0">
                      <v-card-title class="pl-0 pt-0 text-primary text-title">
                        {{ session.title }}
                      </v-card-title>
                      <v-card-subtitle class="pl-0 pt-0 pb-0">
                        {{ session.spaker }}
                      </v-card-subtitle>
                    </v-col>
                  </v-row>
                </v-card-text>
                <div v-else>
                  <v-card-text
                    v-for="sessionSet in session.sessionSet"
                    :key="sessionSet.title"
                  >
                    <p
                      class="time mb-2"
                      v-if="
                        sessionSet !=
                        session.sessionSet[session.sessionSet.length - 1]
                      "
                    >
                      {{ session.time }}
                    </p>
                    <v-row>
                      <v-col cols="4" class="image-center pt-2 pb-0">
                        <img
                          :src="sessionSet.image"
                          alt=""
                          class="agenda-image"
                        />
                      </v-col>
                      <v-col cols="8" class="pt-2">
                        <v-card-title
                          class="pl-0 pt-0 text-primary agenda-text"
                        >
                          {{ sessionSet.title }}
                        </v-card-title>
                        <v-card-subtitle class="pl-0 pt-0 pb-0">
                          {{ sessionSet.spaker }}
                        </v-card-subtitle>
                        <p class="mb-0 mt-0">
                          {{ sessionSet.duringTime }}
                        </p>
                      </v-col>
                    </v-row>
                    <hr
                      v-if="
                        sessionSet !=
                        session.sessionSet[session.sessionSet.length - 1]
                      "
                    />
                  </v-card-text>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: null,
      items: [
        { tab: "20 march 2020", content: "Tab 1 Content" },
        { tab: "21 march 2020", content: "Tab 2 Content" },
      ],
    };
  },
  asyncData({ store }) {
    //api
    return {
      agenda: store.getters.getAgenda,
    };
  },
};
</script>


<style lang="scss" scoped>
.v-tabs {
  margin-bottom: 15px;
}
.v-tab {
  color: #4d4d4d;
  font-weight: bold;
  background: #efefef;
  &.v-tab--active {
    color: #1a56be !important;
  }
  & + .v-tab {
    border-left: #bdbdbd solid 1px;
  }
}
.agenda-card {
  color: #4d4d4d;
  .time {
    color: #1a56be;
    font-weight: bold;
  }
  .agenda-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 50%;
  }
  & + .agenda-card {
    margin-top: 15px;
  }
  &.card-set {
    border-left: 6px solid #1a56be;
    .v-card__text + .v-card__text {
      padding-top: 0 !important;
    }
  }
  hr {
    width: 95%;
    margin: 15px auto 0;
    height: 1px;
    background: #bdbdbd;
    border: 0;
  }
  .agenda-text {
    font-size: 18px;
    font-weight: bold;
  }
  .image-center{
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
