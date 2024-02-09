# Grader - HETIC

## Contexte

Grader est un projet réalisé dans le cadre du cours d'API à HETIC. La consigne principale est de générer un PDF avec une API, le reste est du bonus.

L'application Grader vise à générer les bulletins de notes d'étudiants sous format PDF.

## Installation

### Avec Docker

```bash
make up && make logs
```

Environnement de production ou de développement ?

```yml
# dans le docker-compose, changez la target des services grader_backend et grader_frontend pour l'usage
grader_backend:
    ...
    target: prod #ou dev, par défaut dev
    ...
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
npm run start:prod #ou start:dev
```

Interagissez avec l'api via `http://localhost:4001`

Interagissez avec le client via `http://localhost:3001`
