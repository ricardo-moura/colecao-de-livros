FROM node:18-alpine

WORKDIR /app

# Instalar dependências e TypeScript globalmente
COPY package*.json ./
RUN npm install
RUN npm install -g typescript

# Copiar código fonte
COPY . .

# Criar diretório dist manualmente se não existir
RUN mkdir -p dist

# Compilar TypeScript diretamente usando o compilador tsc global
RUN tsc

# Verificar o conteúdo do diretório dist
RUN ls -la dist/

EXPOSE 3001

# Executar diretamente com node em vez de npm run
CMD ["node", "dist/main.js"]