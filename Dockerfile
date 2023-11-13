FROM node:18-alpine

RUN apk add --no-cache bash curl && curl -1sLf \
'https://dl.cloudsmith.io/public/infisical/infisical-cli/setup.alpine.sh' | bash \
&& apk add infisical

WORKDIR /app

COPY ./package.json ./yarn.lock ./

RUN yarn install

COPY . .

ARG INFISICAL_TOKEN
ENV INFISICAL_TOKEN=$INFISICAL_TOKEN

RUN yarn build
RUN infisical run --domain="https://env.2w.vc/api" -- yarn prisma:generate

EXPOSE 3000

CMD [ "infisical", "run", "--" "yarn", "start" ]
