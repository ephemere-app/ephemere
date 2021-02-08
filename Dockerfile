ARG IMAGE=node:12.20.1

# build stage
FROM ${IMAGE} as builder

ENV APP_USER=app
ENV APP_ROOT=/home/${APP_USER}

RUN mkdir ${APP_ROOT}
WORKDIR ${APP_ROOT}
COPY . ${APP_ROOT}

ENV NODE_ENV=production
ENV NPM_CONFIG_PRODUCTION=false
RUN npm install
RUN npm run build

# runtime stage
FROM ${IMAGE}

ENV APP_USER=app
ENV APP_GROUP=app
ENV APP_ROOT=/home/${APP_USER}

RUN mkdir ${APP_ROOT}
WORKDIR ${APP_ROOT}

RUN groupadd -r ${APP_GROUP} && useradd --no-log-init -r -g ${APP_GROUP} ${APP_USER}
RUN chown -R ${APP_USER}:${APP_GROUP} ${APP_ROOT}
USER ${APP_USER}

COPY --chown=app:app . ${APP_ROOT}
COPY --chown=app:app --from=builder ${APP_ROOT}/.nuxt ${APP_ROOT}/.nuxt
COPY --chown=app:app --from=builder ${APP_ROOT}/static ${APP_ROOT}/static

ENV NODE_ENV=production
ENV NPM_CONFIG_PRODUCTION=true
RUN npm install

ENV HOST 0.0.0.0
ENV PORT 3000

EXPOSE ${PORT}

CMD ["npm", "run", "start"]