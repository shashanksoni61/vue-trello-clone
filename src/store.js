import Vue from 'vue'
import Vuex from 'vuex'
import defaultBoard from './default-board'
import { saveStatePlugin, uuid } from './utils'

Vue.use(Vuex)

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    board
  },
  mutations: {
    CREATE_TASK(state, { tasks, name }) {
      tasks.push({
        name,
        description: '',
        id: uuid()
      });
    },
    UPDATE_TASK(state, { task, key, value }) {
      task[key] = value;
    },
  },
  getters: {
    getTask: state => id => {
      for (const column of state.board.columns) {
        for (const task of column.tasks) {
          if (task.id === id) return task
        }
      }
    }
  },
})
