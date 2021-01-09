import Vue from 'vue'
import { RouterLinkStub, createLocalVue, mount } from '@vue/test-utils'
import Buefy from 'buefy'
import Index from '~/pages/index.vue'

function createWrapper(component: Vue.VueConstructor<Vue>) {
  const localVue = createLocalVue()
  localVue.use(Buefy)

  const mocks = {
    $t: (msg: string) => msg,
    $i18n: { locales: [] },
    localePath: (path: string) => path,
  }

  const stubs = {
    NuxtLink: RouterLinkStub,
    i18n: true,
  }

  return mount(component, {
    localVue,
    mocks,
    stubs,
  })
}

describe('pages/index', () => {
  it('contains all elements', () => {
    const wrapper = createWrapper(Index)

    expect(wrapper.get('.title'))
    expect(wrapper.get('.subtitle'))
    expect(wrapper.get('.button'))
  })
})
