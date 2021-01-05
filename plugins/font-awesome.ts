import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faComments,
  faEnvelopeOpenText,
  faGlobe,
  faLockOpen,
  faPaperPlane,
  faShareAlt,
  faShieldAlt,
  faUserSecret,
  faUserShield,
} from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

config.autoAddCss = false

library.add(
  faComments,
  faEnvelopeOpenText,
  faGlobe,
  faLockOpen,
  faPaperPlane,
  faShareAlt,
  faShieldAlt,
  faUserSecret,
  faUserShield,
  faGithub
)

Vue.component('FontAwesomeIcon', FontAwesomeIcon)
