import Vue from 'vue'
import Vuex from 'vuex'
import { createLocalVue, mount } from '@vue/test-utils'
import Buefy from 'buefy'
import faker from 'faker'
import FreeId from '~/pages/room/_id.vue'

faker.seed(1234)

function generateRoom() {
  return faker.random.alphaNumeric(10)
}

function generateEncryptionKey() {
  return faker.random.alphaNumeric(32)
}

function createRouteMock(room: string, encryptionKey: string) {
  return {
    $route: {
      fullPath: '/test',
      hash: `#${encryptionKey}`,
      params: {
        id: room,
      },
    },
  }
}

function createStoreModule() {
  return {
    room: {
      namespaced: true,
      state: {
        connected: false,
      },
      actions: {
        connect: jest.fn(),
        disconnect: jest.fn(),
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

function createWrapper(
  component: Vue.VueConstructor<Vue>,
  storeModules = {},
  optionalMocks = {}
) {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  localVue.use(Buefy)

  const store = createStore(storeModules)

  const mocks = {
    $t: (msg: string) => msg,
    ...optionalMocks,
  }

  const stubs = {}

  return mount(component, {
    localVue,
    store,
    mocks,
    stubs,
  })
}

describe('pages/free-id', () => {
  it('is a Vue instance', () => {
    const room = generateRoom()
    const encryptionKey = generateEncryptionKey()
    const routeMock = createRouteMock(room, encryptionKey)
    const storeModule = createStoreModule()

    const wrapper = createWrapper(FreeId, storeModule, routeMock)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('connects when mounting and disconnects when destroying', () => {
    const room = generateRoom()
    const encryptionKey = generateEncryptionKey()
    const routeMock = createRouteMock(room, encryptionKey)
    const storeModule = createStoreModule()

    const wrapper = createWrapper(FreeId, storeModule, routeMock)
    expect(
      storeModule.room.actions.connect
    ).toHaveBeenCalledWith(expect.anything(), { room, encryptionKey })

    wrapper.destroy()
    expect(storeModule.room.actions.disconnect).toHaveBeenCalled()
  })

  it('display loading overlay when not connected', () => {
    const room = generateRoom()
    const encryptionKey = generateEncryptionKey()
    const routeMock = createRouteMock(room, encryptionKey)
    const storeModule = createStoreModule()

    const wrapper = createWrapper(FreeId, storeModule, routeMock)

    const loadingOverlay = wrapper.get('.loading-overlay')
    expect(loadingOverlay).toBeDefined()
  })

  it('hide loading overlay when connected', () => {
    const room = generateRoom()
    const encryptionKey = generateEncryptionKey()
    const routeMock = createRouteMock(room, encryptionKey)
    const storeModule = createStoreModule()
    storeModule.room.state.connected = true

    const wrapper = createWrapper(FreeId, storeModule, routeMock)

    expect(() => wrapper.get('.loading-overlay')).toThrow()
  })

  it('handles empty room id', () => {
    const room = ''
    const encryptionKey = generateEncryptionKey()
    const routeMock = createRouteMock(room, encryptionKey)
    const storeModule = createStoreModule()

    const wrapper = createWrapper(FreeId, storeModule, routeMock)
    expect(wrapper).toBeTruthy()
    expect(storeModule.room.actions.connect).not.toHaveBeenCalled()
  })

  it('handles empty encryption key', () => {
    const room = generateRoom()
    const encryptionKey = ''
    const routeMock = createRouteMock(room, encryptionKey)
    const storeModule = createStoreModule()

    const wrapper = createWrapper(FreeId, storeModule, routeMock)
    expect(wrapper).toBeTruthy()
    expect(storeModule.room.actions.connect).not.toHaveBeenCalled()
  })
})
