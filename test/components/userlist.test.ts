import Vue from 'vue'
import Vuex from 'vuex'
import { createLocalVue, mount } from '@vue/test-utils'
import Buefy from 'buefy'
import faker from 'faker'
import flushPromises from 'flush-promises'
import UserList from '~/components/UserList.vue'

faker.seed(1234)

function generateUsers() {
  const users = []
  for (let i = 0; i < 4; ++i) {
    users.push({
      id: faker.random.alphaNumeric(),
      username: faker.internet.userName(),
      me: false,
    })
  }
  users[0].me = true
  return users
}

function createStoreModule() {
  return {
    room: {
      namespaced: true,
      state: {
        username: faker.internet.userName(),
        users: generateUsers(),
      },
      actions: {
        updateUsername: jest.fn(),
      },
    },
  }
}

function createStore(modules = {}) {
  return new Vuex.Store({
    modules: {
      ...modules,
    },
  })
}

function createWrapper(component: Vue.VueConstructor<Vue>, storeModules = {}) {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  localVue.use(Buefy)

  const store = createStore(storeModules)

  const mocks = {
    $t: (msg: string) => msg,
  }

  const stubs = {}

  return mount(component, {
    localVue,
    store,
    mocks,
    stubs,
  })
}

describe('components/user-list', () => {
  it('can display users in given order', () => {
    const storeModule = createStoreModule()
    const wrapper = createWrapper(UserList, storeModule)

    storeModule.room.state.users.forEach((u, i) => {
      const msgComp = wrapper.find(`article[data-user=user-${i}]`)

      if (u.me) {
        const me = msgComp.find('.content > p > span > span')
        expect(me.text()).toBe('userlist.me')

        const username = msgComp.find('.content > p > span > span + span')
        expect(username.text()).toBe(`(${u.username})`)
      } else if (u.username === '') {
        const username = msgComp.find('.content > p > span')
        expect(username.text()).toBe(`userlist.anonymous ${i + 1}`)
      } else {
        const username = msgComp.find('.content > p > span')
        expect(username.text()).toBe(u.username)
      }
    })
  })

  it('can input a new username', async () => {
    const storeModule = createStoreModule()
    const wrapper = createWrapper(UserList, storeModule)

    const username = faker.internet.userName()
    const input = wrapper.find('input')
    input.setValue(username)

    await flushPromises()

    expect(storeModule.room.actions.updateUsername).toHaveBeenCalledWith(
      expect.anything(),
      username
    )
  })
})
