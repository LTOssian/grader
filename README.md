# Grader - HETIC

## Contexte

Grader est un projet réalisé dans le cadre du cours d'API à HETIC. La consigne principale est de générer un PDF avec une API, le reste est du bonus.

L'application Grader vise à générer les bulletins de notes d'étudiants sous format PDF.

## Installation

### Avec Docker

```bash
make up-dev # ou make up-prod
make logs
```

### Sans Docker

```bash
# depuis la racine
cd server

# mettez en place la base de donnée
psql -U username -d database_name -a -f ./db_migrations/migrations_1_init_db.sql

# mettez en place le .env
echo "DATABASE_URL=<URL de votre database ici>" > .env

# installer les dépendances et lancer l'app
npm install && npm run build
npm run start:prod #ou start:dev

# depuis le racine
cd client
npm install && npm run build
npm run start #ou start
```

Interagissez avec l'api via `http://localhost:4001/api/`

Interagissez avec le client via `http://localhost:4200/` en dev ou `http://localhost:8080/` en prod
