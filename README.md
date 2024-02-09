# Grader - HETIC

## Contexte

Grader est un projet réalisé dans le cadre du cours d'API à HETIC. La consigne principale est de générer un PDF avec une API, le reste est du bonus.

L'application Grader vise à générer les bulletins de notes d'étudiants sous format PDF.

## Installation

Si vous avez Docker, suivez cette suite de commande :

```bash
make up && make logs
```

Sinon, suivez cette suite de commande. Il faut impérativement avoir `npm` :

```bash
touch .env <<< blabla db
make install && make start
```

Interagissez avec l'api via `http://localhost:4001`

Interagissez avec le client via `http://localhost:3001`
