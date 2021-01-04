export default {
  navbar: {
    brand: 'Ephemere',
    language: 'Langue',
  },

  credits: {
    made: 'Développé par {author}',
    powered: 'Propulsé par {nuxt}, {socketio}, {bulma} et {fontawesome}',
    e2ee: 'Données protégées par chiffrement bout-en-bout avec {tweetnacljs}',
    analytics: `Analyse d'utilisation respectueuse de la vie-privée grâce à {chiffre}`,
    website: 'Ce site-web est ouvert sous licence {license}',
    copyright: {
      text: 'Tous droits réservés',
      start: '2021',
      end: 'present',
      owner: 'Romain Clement',
    },
    version: 'Version',
    language: 'Langue',
  },

  error: {
    pageNotFound: {
      title: 'Page introuvable',
      subtitle: 'Il semblerait que vous soyez perdu !',
    },
    internalServerError: {
      title: 'Une erreur est survenue',
      subtitle: `Nous sommes en train d'enquêter ...`,
    },
    backToHome: `Retour à l'accueil`,
  },

  home: {
    title: 'Ephemere',
    subtitle: 'Open a secure line',
    newRoom: 'New room',
    tagline: `End-to-end encrypted and ephemeral instant messaging app, where messages are never stored server-side and only resides within the user's app.`,
  },

  join: {
    secureLink: 'Cette connexion est sécurisée par chiffrement bout-en-bout',
    linkCopied: 'Lien copié dans le presse-papier',
  },

  chat: {
    newMessage: 'Message',
    send: 'Envoyer',
  },

  userlist: {
    username: `Nom d'utilisateur`,
    me: 'Moi',
    anonymous: 'Utilisateur Anonyme',
  },
}
