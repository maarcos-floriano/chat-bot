FROM node:latest

# Instalar dockerize e copiar o script de espera
RUN curl -sSL https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh \
    -o /usr/local/bin/wait-for-it.sh && \
    chmod +x /usr/local/bin/wait-for-it.sh

# Definir o diretório de trabalho
WORKDIR /usr/src/app

# Copiar a aplicação para o container
COPY . .

# Instalar dependências
RUN npm install

# Comando padrão
CMD ["wait-for-it.sh", "mysql-db:3306", "--", "node", "index.js"]
