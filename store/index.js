export const state = () => ({
  dialog: {
    isShow: false,
    title: '',
    message: ''
  },
  line: {
    pictureUrl: null,
    displayName: null,
    userId: null,
  },
  survey: {
    survey1: 5,
    survey2: '',
    survey3: 1,
  },
  user: {
    firstname: '',
    lastname: '',
    gender: 1,
    email: "",
    phone: "",
    birthday: '',
    company: "",
    position: "",
  },
  register: {
    firstname: '',
    lastname: '',
    gender: 1,
    email: "",
    phone: "",
    birthday: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    company: "",
    position: "",
  },
  data: {
    agenda: [
      {
        date: "20 March 2020",
        sessions: [
          {
            time: "10:00 AM",
            title: "INTRODUCTIONS-1",
            spaker: "Marvelous Team",
            image: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
            duringTime: "100 min"
          },
          {
            type: "set",
            time: "12:00 AM",
            sessionSet: [
              {
                title: "INTRODUCTIONS-2",
                spaker: "Marvelous Team",
                image: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
                duringTime: "100 min"
              },
              {
                title: "INTRODUCTIONS-3",
                spaker: "Marvelous Team",
                image: "https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg",
                duringTime: "100 min"
              }
            ]
          }
        ]
      },
      {
        date: "21 March 2020",
        sessions: [
          {
            time: "10:00 AM",
            title: "INTRODUCTIONS-4",
            spaker: "Marvelous Team",
            image: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
            duringTime: "100 min"
          },
          {
            time: "10:00 AM",
            title: "INTRODUCTIONS-5",
            spaker: "Marvelous Team",
            image: "https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg",
            duringTime: "100 min"
          }
        ]
      }
    ],
    workshops: [
      {
        date: "20 March 2020",
        sessions: [
          {
            id: 1,
            title: "My journey with Vue1",
            topic: "Design Thinking",
            spaker: "Mr. John David and Team",
            image: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
            detail:
              "Design Thinking is a design methodology that provides a solution-based approach to solving problems. We will focus on the five-stage Design Thinking model. Empathise, Define (the problem), Ideate, Prototype, and Test.",
            time: "Time : 13: 30 - 16: 30",
            spakers: "- Mr. John David<br>- Mr. David Round",
            place: "Room 101"
          },
          {
            id: 2,
            title: "My journey with Vue2",
            topic: "Design Thinking",
            spaker: "Mr. John David and Team",
            image: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
            detail:
              "Design Thinking is a design methodology that provides a solution-based approach to solving problems. We will focus on the five-stage Design Thinking model. Empathise, Define (the problem), Ideate, Prototype, and Test.",
            time: "Time : 13: 30 - 16: 30",
            spakers: "- Mr. John David<br>- Mr. David Round",
            place: "Room 102"
          },
          {
            id: 3,
            title: "My journey with Vue3",
            topic: "Design Thinking",
            spaker: "Mr. John David and Team",
            image: "https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg",
            detail:
              "Design Thinking is a design methodology that provides a solution-based approach to solving problems. We will focus on the five-stage Design Thinking model. Empathise, Define (the problem), Ideate, Prototype, and Test.",
            time: "Time : 13: 30 - 16: 30",
            spakers: "- Mr. John David<br>- Mr. David Round",
            place: "Room 103"
          }
        ]
      },
      {
        date: "21 March 2020",
        sessions: [
          {
            id: 4,
            title: "My journey with Vue4",
            topic: "Design Thinking",
            spaker: "Mr. John David and Team",
            image: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
            detail:
              "Design Thinking is a design methodology that provides a solution-based approach to solving problems. We will focus on the five-stage Design Thinking model. Empathise, Define (the problem), Ideate, Prototype, and Test.",
            time: "Time : 1: 30 PM - 4: 30 PM",
            spakers: "- Mr. John David<br>- Mr. David Round",
            place: "Room 101"
          },
          {
            id: 5,
            title: "My journey with Vue5",
            topic: "Design Thinking",
            spaker: "Mr. John David and Team",
            image: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
            detail:
              "Design Thinking is a design methodology that provides a solution-based approach to solving problems. We will focus on the five-stage Design Thinking model. Empathise, Define (the problem), Ideate, Prototype, and Test.",
            time: "Time : 1: 30 PM - 4: 30 PM",
            spakers: "- Mr. John David<br>- Mr. David Round",
            place: "Room 102"
          },
          {
            id: 6,
            title: "My journey with Vue6",
            topic: "Design Thinking",
            spaker: "Mr. John David and Team",
            image: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
            detail:
              "Design Thinking is a design methodology that provides a solution-based approach to solving problems. We will focus on the five-stage Design Thinking model. Empathise, Define (the problem), Ideate, Prototype, and Test.",
            time: "Time : 1: 30 PM - 4: 30 PM",
            spakers: "- Mr. John David<br>- Mr. David Round",
            place: "Room 103"
          }
        ]
      }
    ]
  }
})

export const getters = {
  getUser(state) {
    return state.user
  },
  getRegister(state) {
    return state.register
  },
  getDialog(state) {
    return state.dialog
  },
  getWorkshop(state) {
    return state.data.workshops
  },
  getAgenda(state) {
    return state.data.agenda
  },
  getSurvey(state) {
    return state.survey
  },
  getLine(state) {
    return state.line
  }
}

export const mutations = {
  SET_REGISTER(state, data) {
    state.register = {
      ...state.register,
      ...data
    }
  },
  SET_USER(state, data) {
    state.user = {
      ...state.user,
      ...data
    }
  },
  SET_DIALOG(state, data) {
    state.dialog = {
      ...state.dialog,
      ...data
    }
  },
  SET_SURVEY(state, data) {
    state.survey = {
      ...state.survey,
      ...data
    }
  },
  SET_LINE(state, data) {
    state.line = {
      ...state.line,
      ...data
    }
  }
}

export const actions = {
  setUser({ commit }, data) {
    commit('SET_USER', data)
  },
  setRegister({ commit }, data) {
    commit('SET_REGISTER', data)
  },
  setDialog({ commit }, data) {
    commit('SET_DIALOG', data)
  },
  setSurvey({ commit }, data) {
    commit('SET_SURVEY', data)
  },
  setLine({ commit }, data) {
    commit('SET_LINE', data)
  }
}
