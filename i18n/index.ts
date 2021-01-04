import common from './common'
import en from './en'
import fr from './fr'

const locales = [
  {
    name: 'English',
    code: 'en',
    iso: 'en-US',
  },
  {
    name: 'French',
    code: 'fr',
    iso: 'fr-FR',
  },
]

const defaultLocale = locales[0].code

const messages = {
  en: {
    common,
    ...en,
  },
  fr: {
    common,
    ...fr,
  },
}

const dateTimeFormats = {
  en: {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
    long: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
    },
  },
  fr: {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
    long: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    },
  },
}

export default {
  locales,
  defaultLocale,
  messages,
  dateTimeFormats,
}
