import Vue from 'vue'
import VueRouter from 'vue-router'
import { RouterLinkStub, createLocalVue, mount } from '@vue/test-utils'
import Buefy from 'buefy'
import Navbar from '~/components/Navbar.vue'

function createWrapper(component: Vue.VueConstructor<Vue>) {
  const localVue = createLocalVue()
  localVue.use(Buefy)

  const router = new VueRouter({ mode: 'abstract' })

  const mocks = {
    $t: (msg: string) => msg,
    $i18n: { locales: [] },
    localePath: (path: string) => path,
    switchLocalePath: (code: string) => code,
  }

  const stubs = {
    NuxtLink: RouterLinkStub,
  }

  return mount(component, {
    localVue,
    router,
    mocks,
    stubs,
  })
}

describe('components/navbar', () => {
  it('contains all items', () => {
    const wrapper = createWrapper(Navbar)

    expect(wrapper.findAll('.navbar-brand > .navbar-item').length).toBe(1)
    expect(wrapper.findAll('.navbar-start > .navbar-item').length).toBe(0)
    expect(wrapper.findAll('.navbar-end > .navbar-item').length).toBe(1)
  })
})
