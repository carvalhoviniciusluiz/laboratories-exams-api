FROM node:14-alpine

RUN set -x \
    && chmod 775 /usr/local/bin/* \
    && chmod +x /usr/local/bin/*.sh \
    && mkdir /server

WORKDIR /server

EXPOSE 5000
EXPOSE 9229

CMD yarn dev
