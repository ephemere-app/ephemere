import Vue from 'vue'
import Vuex from 'vuex'
import { createLocalVue, mount } from '@vue/test-utils'
import Buefy from 'buefy'
import faker from 'faker'
import Messages from '~/components/Messages.vue'

faker.seed(1234)

function generateMessages() {
  const messages = []
  for (let i = 0; i < 4; ++i) {
    messages.push({
      username: faker.internet.userName(),
      content: faker.lorem.sentence(),
      datetime: faker.date.recent().toISOString(),
    })
  }

  return messages
}

function createStoreModule() {
  return {
    room: {
      namespaced: true,
      state: {
        chatMessages: generateMessages(),
      },
      actions: {
        sendChatMessage: jest.fn(),
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
    $d: (msg: Date) => msg,
  }

  const stubs = {}

  return mount(component, {
    localVue,
    store,
    mocks,
    stubs,
  })
}

describe('components/chat', () => {
  it('can display messages in given order', () => {
    const storeModule = createStoreModule()
    const wrapper = createWrapper(Messages, storeModule)

    storeModule.room.state.chatMessages.forEach((m, i) => {
      const msgComp = wrapper.find(`article[data-message=message-${i}]`)

      const username = msgComp.find('.content > p > strong')
      expect(username.text()).toBe(m.username)

      const datetime = msgComp.find('.content > p > small')
      expect(datetime.text()).toBe(new Date(m.datetime).toString())

      const content = msgComp.find('.content > p > br + span')
      expect(content.text()).toBe(m.content)
    })
  })
})
