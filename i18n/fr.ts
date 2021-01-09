export default {
  credits: {
    made: 'Développé par {author}',
    powered: 'Propulsé par {nuxt}, {socketio}, {buefy} et {fontawesome}',
    e2ee: 'Données protégées par chiffrement bout-en-bout avec {tweetnacljs}',
    analytics: `Analyse d'utilisation respectueuse de la vie-privée grâce à {chiffre}`,
    website: 'Cette application web est ouverte sous licence {license}',
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

  hero: {
    title: 'Ephemere',
    subtitle: 'Ouvrez une ligne sécurisée',
    newRoom: 'Nouveau salon',
    tagline: `Messagerie instantanée chiffrée bout-en-bout et éphémère, où les messages ne sont jamais stockés côté serveur et restent uniquement dans l'application utilisateur.`,
  },

  features: {
    title: 'Fonctionnalités',
    subtitle:
      'Ephemere est ne fait pas les choses comme les autres, voyez par vous-même!',
    messaging: {
      title: 'Messagerie',
      text: `Déjà eu besoin de transmettre une information sensible simplement à un collègue ou un ami,
      avec la garantie de ne laisser aucune trace ? Créez un salon sécurisé avec Ephemere et partagez simplement le lien.`,
    },
    security: {
      title: 'Securité',
      text: `Tous les dessins et messages instantanés sont envoyés chiffrés bout-en-bout à travers le réseau,
      en utilisant la "cryptographie authentifiée à clé-secrète" (XSalsa20-Poly1305).
      En d'autres termes, les serveurs de synchronisation ne pourront jamais voir vos données,
      même lors de leur transmission. Propulsé par {tweetnacljs}.`,
    },
    privacy: {
      title: 'Vie privée',
      text: `Tous les messages sont synchronisés en temps-réel et jamais stockés sur un serveur.
      Fermez le salon sécurisé et tous les messages disparaissent. Propulsé par {socketio}.`,
    },
    mobile: {
      title: 'Mobile',
      text: `Ephemere est une application web complètement fonctionnelle sur ordinateur et mobile,
      et également disponible comme une Progressive Web App (PWA). Powered by {nuxt}.`,
    },
    oss: {
      title: 'Open-Source',
      text: `Nous croyons fortement que la transparence va de pair avec le respect de la vie privée,
      c'est pourquoi cette application est un logiciel libre et ouvert (open-source) sous
      licence {license}, disponible publiquement sur {repository}.`,
    },
    suggestions: {
      title: 'Suggestions',
      text: `Vous avez trouvé un bug ? Une fonctionnalité est manquante ? Ouvrez un ticket et/ou contribuez sur {repository}.`,
    },
  },

  security: {
    title: 'Sécurité',
    subtitle: `Le modèle de sécurité d'Ephemere est basé sur une architecture nulle de connaissance.`,
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
