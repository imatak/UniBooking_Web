import * as firebase from 'firebase'

export default {
  state: {
    loadedEvents: [
      {
        id: 'Loading',
        razlog: 'Loading',
        fakultet: 'Loading',
        status: 'Loading',
        datum: 'Loading',
        termin: 'Loading',
        emailUsera: 'Loading',
        timeStamp: 'Loading',
        komentar: 'Loading',
        uredio: 'Loading'
      }
    ],
    loadedPastEvents: [
      {
        id: 'Loading',
        razlog: 'Loading',
        fakultet: 'Loading',
        status: 'Loading',
        datum: 'Loading',
        termin: 'Loading',
        emailUsera: 'Loading',
        timeStamp: 'Loading',
        komentar: 'Loading',
        uredio: 'Loading'
      }
    ],
    loadedAllEvents: [
      {
        id: 'Loading',
        razlog: 'Loading',
        fakultet: 'Loading',
        status: 'Loading',
        datum: 'Loading',
        termin: 'Loading',
        emailUsera: 'Loading',
        timeStamp: 'Loading',
        komentar: 'Loading',
        uredio: 'Loading'
      }
    ]
  },
  mutations: {
    setLoadedEvents (state, payload) {
      state.loadedEvents = payload
    },
    setLoadedPastEvents (state, payload) {
      state.loadedPastEvents = payload
    },
    setLoadedAllEvents (state, payload) {
      state.loadedAllEvents = payload
    },
    createEvent (state, payload) {
      state.loadedAllEvents.push(payload)
      location.reload()
    },
    updateEvent (state, payload) {
      var user = firebase.auth().currentUser
      const event = state.loadedEvents.find(event => {
        return event.id === payload.id
      })
      event.status = 'Odobreno'
      event.uredio = user.email
      const allevent = state.loadedAllEvents.find(allevent => {
        return allevent.id === payload.id
      })
      allevent.status = 'Odobreno'
      allevent.uredio = user.email
      const pastevent = state.loadedPastEvents.find(pastevent => {
        return pastevent.id === payload.id
      })
      pastevent.status = 'Odobreno'
      pastevent.uredio = user.email
    },
    updateEventOtkazano (state, payload) {
      var user = firebase.auth().currentUser
      const event = state.loadedEvents.find(event => {
        return event.id === payload.id
      })
      event.status = 'Otkazano'
      event.uredio = user.email
      const allevent = state.loadedAllEvents.find(allevent => {
        return allevent.id === payload.id
      })
      allevent.status = 'Otkazano'
      allevent.uredio = user.email
      const pastevent = state.loadedPastEvents.find(pastevent => {
        return pastevent.id === payload.id
      })
      pastevent.status = 'Otkazano'
      pastevent.uredio = user.email
    },
    updateEventKomentar (state, payload) {
      var user = firebase.auth().currentUser
      const event = state.loadedEvents.find(event => {
        return event.id === payload.id
      })
      event.komentar = payload.description
      event.uredio = user.email
      const allevent = state.loadedAllEvents.find(allevent => {
        return allevent.id === payload.id
      })
      allevent.komentar = payload.description
      allevent.uredio = user.email
      const pastevent = state.loadedPastEvents.find(pastevent => {
        return pastevent.id === payload.id
      })
      pastevent.komentar = payload.description
      pastevent.uredio = user.email
    }
  },
  actions: {
    loadEvents ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('Rezervacije').once('value')
        .then((data) => {
          const events = []
          const obj = data.val()
          for (let key in obj) {
            var dateA = obj[key].timeStamp
            dateA = parseInt(dateA)
            var currentdate = new Date()
            currentdate = currentdate.getTime()
            currentdate = currentdate.toString()
            currentdate = currentdate.slice(0, -5)
            currentdate = parseInt(currentdate)
            if (dateA > currentdate) {
              events.push({
                id: obj[key].id,
                razlog: obj[key].razlog,
                fakultet: obj[key].fakultet,
                status: obj[key].status,
                datum: obj[key].datum,
                termin: obj[key].termin,
                emailUsera: obj[key].emailUsera,
                timeStamp: obj[key].timeStamp,
                komentar: obj[key].komentar,
                uredio: obj[key].uredio
              })
            }
          }
          commit('setLoadedEvents', events)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    loadPastEvents ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('Rezervacije').once('value')
        .then((data) => {
          const events = []
          const obj = data.val()
          for (let key in obj) {
            var dateA = obj[key].timeStamp
            dateA = parseInt(dateA)
            var currentdate = new Date()
            currentdate = currentdate.getTime()
            currentdate = currentdate.toString()
            currentdate = currentdate.slice(0, -5)
            currentdate = parseInt(currentdate)
            if (dateA < currentdate) {
              events.push({
                id: obj[key].id,
                razlog: obj[key].razlog,
                fakultet: obj[key].fakultet,
                status: obj[key].status,
                datum: obj[key].datum,
                termin: obj[key].termin,
                emailUsera: obj[key].emailUsera,
                timeStamp: obj[key].timeStamp,
                komentar: obj[key].komentar,
                uredio: obj[key].uredio
              })
            }
          }
          commit('setLoadedPastEvents', events)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    loadAllEvents ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('Rezervacije').once('value')
        .then((data) => {
          const events = []
          const obj = data.val()
          for (let key in obj) {
            events.push({
              id: obj[key].id,
              razlog: obj[key].razlog,
              fakultet: obj[key].fakultet,
              status: obj[key].status,
              datum: obj[key].datum,
              termin: obj[key].termin,
              emailUsera: obj[key].emailUsera,
              timeStamp: obj[key].timeStamp,
              komentar: obj[key].komentar,
              uredio: obj[key].uredio
            })
          }
          commit('setLoadedAllEvents', events)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    createEvent ({commit, getters}, payload) {
      const event = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      let imageUrl
      let key
      firebase.database().ref('events').push(event)
        .then((data) => {
          key = data.key
          return key
        })
        .then(key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('events/' + key + '.' + ext).put(payload.image)
        })
        .then(fileData => {
          imageUrl = fileData.metadata.downloadURLs[0]
          return firebase.database().ref('events').child(key).update({imageUrl: imageUrl})
        })
        .then(() => {
          commit('createEvent', {
            ...event,
            imageUrl: imageUrl,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updateEventData ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      if (payload.date) {
        updateObj.date = payload.date
      }
      firebase.database().ref('events').child(payload.id).update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('updateEvent', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    odobriTermin ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      updateObj.status = 'Odobreno'
      var user = firebase.auth().currentUser
      updateObj.uredio = user.email
      firebase.database().ref('Rezervacije').child(payload.id).update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('updateEvent', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    otkaziTermin ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      updateObj.status = 'Otkazano'
      var user = firebase.auth().currentUser
      updateObj.uredio = user.email
      firebase.database().ref('Rezervacije').child(payload.id).update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('updateEventOtkazano', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    updateKomentar ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      updateObj.komentar = payload.description
      var user = firebase.auth().currentUser
      updateObj.uredio = user.email
      firebase.database().ref('Rezervacije').child(payload.id).update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('updateEventKomentar', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    }
  },
  getters: {
    loadedEvents (state) {
      return state.loadedEvents.sort((eventA, eventB) => {
        var dateAAA = parseInt(eventA.timeStamp)
        var dateBBB = parseInt(eventB.timeStamp)
        return dateAAA - dateBBB
      })
    },
    loadedPastEvents (state) {
      return state.loadedPastEvents.sort((eventA, eventB) => {
        var dateAAA = parseInt(eventA.timeStamp)
        var dateBBB = parseInt(eventB.timeStamp)
        return dateBBB - dateAAA
      })
    },
    featuredEvents (state, getters) {
      return getters.loadedEvents.slice(0, 5)
    },
    loadedEvent (state) {
      return (eventId) => {
        return state.loadedEvents.find((event) => {
          return event.id === eventId
        })
      }
    },
    loadedPastEvent (state) {
      return (eventId) => {
        return state.loadedPastEvents.find((event) => {
          return event.id === eventId
        })
      }
    },
    loadedAllEvent (state) {
      return (eventId) => {
        return state.loadedAllEvents.find((event) => {
          return event.id === eventId
        })
      }
    }
  }
}
