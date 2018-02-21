import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state: {
    todos: [],
    visibility: 'all'
  },
  mutations: {
    ADD_TODO (state, title) {
      state.todos.push({
        title,
        completed: false
      })
    },
    CHANGE_VISIBILITY (state, newVisibilityValue) {
      state.visibility = newVisibilityValue
    },
    DEL_TODO (state, index) {
      state.todos.splice(index, 1)
    },
    STATUS_TODO (state, index) {
      state.todos[index].completed = !state.todos[index].completed
    },
    GET_TODOS (state, todos) {
      state.todos = todos
    },
    CLEAR_COMPLETED (state) {
      for (let i = state.todos.length - 1; i >= 0; i--) {
        if (state.todos[i].completed) {
          state.todos.splice(i, 1)
        }
      }
    },
    SORT_TABLE (state, index) {
      state.todos.splice(index.newIndex, 0, state.todos.splice(index.oldIndex, 1)[0])
    }

  },
  actions: {
    addTodo ({commit, dispatch}, title) {
      commit('ADD_TODO', title)
      dispatch('saveTodos')
    },
    changeVisibility ({commit}, newVisibilityValue) {
      commit('CHANGE_VISIBILITY', newVisibilityValue)
    },
    delTodo ({commit, dispatch}, index) {
      commit('DEL_TODO', index)
      dispatch('saveTodos')
    },
    statusTodo ({commit, dispatch}, index) {
      commit('STATUS_TODO', index)
      dispatch('saveTodos')
    },
    saveTodos ({state}) {
      localStorage.setItem('todos', JSON.stringify(state.todos))
    },
    getTodos ({commit}, todos) {
      commit('GET_TODOS', todos)
    },
    clearCompleted ({commit}) {
      commit('CLEAR_COMPLETED')
    },
    sortTable ({commit, dispatch}, index) {
      commit('SORT_TABLE', index)
      dispatch('saveStorage')
    }
  },
  getters: {
    todos: state => state.todos,
    visibility: state => state.visibility,
    activeTodos: state => state.todos.filter(todo => todo.completed === false).length,
    completedTodos: state => state.todos.filter(todo => todo.completed === true).length,
    allTodos: state => state.todos.length
  }
})
