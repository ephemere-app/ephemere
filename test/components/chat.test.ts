import Vue from 'vue'
import Vuex from 'vuex'
import { createLocalVue, mount } from '@vue/test-utils'
import Buefy from 'buefy'
import faker from 'faker'
import flushPromises from 'flush-promises'
import Chat from '~/components/Chat.vue'

faker.seed(1234)

function createStoreModule() {
  return {
    room: {
      namespaced: true,
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

describe('components/chat', () => {
  it('can send a new message with return key', async () => {
    const storeModule = createStoreModule()
    const wrapper = createWrapper(Chat, storeModule)

    const newMessage = faker.lorem.sentence()
    const input = wrapper.find('input')
    input.setValue(newMessage)
    await flushPromises()

    input.trigger('keyup.enter')
    await flushPromises()

    expect(storeModule.room.actions.sendChatMessage).toHaveBeenCalledWith(
      expect.anything(),
      newMessage
    )
  })

  it('cannot send an empty message with return key', async () => {
    const storeModule = createStoreModule()
    const wrapper = createWrapper(Chat, storeModule)

    const newMessage = ''
    const input = wrapper.find('input')
    input.setValue(newMessage)
    await flushPromises()

    input.trigger('keyup.enter')
    await flushPromises()

    expect(wrapper.emitted('new-message')).toBeFalsy()
  })

  it('can send a new message with button', async () => {
    const storeModule = createStoreModule()
    const wrapper = createWrapper(Chat, storeModule)

    const newMessage = faker.lorem.sentence()
    const input = wrapper.find('input')
    input.setValue(newMessage)

    const button = wrapper.find('button')
    expect(button.attributes('disabled')).toBe('disabled')

    await flushPromises()
    expect(button.attributes('disabled')).toBeUndefined()

    button.trigger('click')
    await flushPromises()
    expect(button.attributes('disabled')).toBe('disabled')

    expect(storeModule.room.actions.sendChatMessage).toHaveBeenCalledWith(
      expect.anything(),
      newMessage
    )
  })

  it('cannot send an empty message with button', async () => {
    const storeModule = createStoreModule()
    const wrapper = createWrapper(Chat, storeModule)

    const newMessage = ''
    const input = wrapper.find('input')
    input.setValue(newMessage)

    const button = wrapper.find('button')
    expect(button.attributes('disabled')).toBe('disabled')

    await flushPromises()
    expect(button.attributes('disabled')).toBe('disabled')

    button.trigger('click')
    await flushPromises()
    expect(button.attributes('disabled')).toBe('disabled')

    expect(wrapper.emitted('new-message')).toBeFalsy()
  })
})
