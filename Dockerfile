FROM node:18-alpine

WORKDIR /app

# Copia apenas os arquivos necessários para instalação
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copia o restante (incluindo .env.example)
COPY . .

# Expõe a porta padrão (será sobrescrita pelo compose)
EXPOSE 8000

CMD ["yarn", "dev"]