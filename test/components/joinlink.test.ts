import Vue from 'vue'
import { createLocalVue, mount } from '@vue/test-utils'
import Buefy from 'buefy'
import faker from 'faker'
import flushPromises from 'flush-promises'
import JoinLink from '~/components/JoinLink.vue'

faker.seed(1234)

function createWrapper(
  component: Vue.VueConstructor<Vue>,
  optionalProps?: object
) {
  const localVue = createLocalVue()
  localVue.use(Buefy)

  const mocks = {
    $t: (msg: string) => msg,
    $copyText: (msg: string) => msg,
  }

  const stubs = {}

  return mount(component, {
    localVue,
    mocks,
    stubs,
    propsData: optionalProps,
  })
}

function generateProps() {
  return {
    value: faker.internet.url(),
  }
}

describe('components/join-link', () => {
  HTMLElement.prototype.insertAdjacentElement = jest.fn()

  it('is a Vue instance', () => {
    const props = generateProps()
    const wrapper = createWrapper(JoinLink, props)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('can copy to clipboard and show notification', async () => {
    const props = generateProps()
    const wrapper = createWrapper(JoinLink, props)

    const button = wrapper.find('button')
    button.trigger('click')
    await flushPromises()

    expect(wrapper.emitted('clipboard-link')?.length).toBe(1)
    expect(wrapper.emitted('clipboard-link')?.[0][0]).toEqual(props.value)
  })
})
