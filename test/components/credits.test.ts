import Vue from 'vue'
import { createLocalVue, mount } from '@vue/test-utils'
import Buefy from 'buefy'
import Credits from '~/components/Credits.vue'

function createWrapper(component: Vue.VueConstructor<Vue>) {
  const localVue = createLocalVue()
  localVue.use(Buefy)

  const mocks = {
    $t: (msg: string) => msg,
    $i18n: { locales: [] },
  }

  const stubs = {
    i18n: true,
  }

  return mount(component, {
    localVue,
    mocks,
    stubs,
  })
}

describe('components/credits', () => {
  it('contains footer', () => {
    const wrapper = createWrapper(Credits)
    expect(wrapper.get('.footer'))
  })
})
