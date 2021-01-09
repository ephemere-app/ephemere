export default {
  credits: {
    made: 'Developed by {author}',
    powered: 'Powered by {nuxt}, {socketio}, {buefy} and {fontawesome}',
    e2ee: 'All data are end-to-end encrypted with {tweetnacljs}',
    analytics: 'Privacy-first analytics tracking powered by {chiffre}',
    website:
      'This web application is open-source software under {license} license',
    copyright: {
      text: 'Copyright',
      start: '2021',
      end: 'present',
      owner: 'Romain Clement',
    },
    version: 'Version',
    language: 'Language',
  },

  error: {
    pageNotFound: {
      title: 'Page not found',
      subtitle: 'It seems you are lost!',
    },
    internalServerError: {
      title: 'Something went wrong',
      subtitle: 'We are investigating...',
    },
    backToHome: 'Back to home',
  },

  hero: {
    title: 'Ephemere',
    subtitle: 'Open a secure line',
    newRoom: 'New room',
    tagline: `End-to-end encrypted and ephemeral instant messaging app, where messages are never stored server-side and only resides within the user's app.`,
  },

  features: {
    title: 'Features',
    subtitle: 'Ephemere is one of a kind, check-it out!',
    messaging: {
      title: 'Messaging',
      text: `Ever needed to transmit a sensitive information easily to a colleague or a friend?
      Create a secure room and simply share the link.
      All messages are synchronized in real-time in a peer-to-peer fashion.
      This means synchronization servers will never keep any data, only transmitting it.
      Powered by {socketio}.`,
    },
    privacy: {
      title: 'Privacy',
      text: `All messages are sent end-to-end encrypted over the wire,
      using "secret-key authenticated encryption" (XSalsa20-Poly1305).
      This means synchronization servers will never be able to see your data,
      even when transmitting it. Powered by {tweetnacljs}.`,
    },
    oss: {
      title: 'Open-Source',
      text: `We strongly believe transparency goes hand-in-hand with privacy,
      that's why this application is free and open-source software under
      {license} license, available publicly on {repository}.`,
    },
    suggestions: {
      title: 'Suggestions',
      text: `Found a bug? Missing a feature? Open an issue and/or contribute on {repository}.`,
    },
  },

  security: {
    title: 'Security',
    subtitle:
      'Ephemere security model is based on a zero-knowledge architecture.',
  },

  join: {
    secureLink: 'This connection is secured using end-to-end encryption',
    linkCopied: 'Link copied to clipboard',
  },

  chat: {
    newMessage: 'Message',
    send: 'Send',
  },

  userlist: {
    username: 'Username',
    me: 'Me',
    anonymous: 'Anonymous User',
  },
}
