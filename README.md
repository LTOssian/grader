# Grader - HETIC

## Contexte

Grader est un projet réalisé dans le cadre du cours d'API à HETIC. La consigne principale est de générer un PDF avec une API, le reste est du bonus.

L'application Grader vise à générer les bulletins de notes d'étudiants sous format PDF.

## Installation

Si vous avez Docker, suivez cette suite de commande :

```bash
makefile compose-start
```

Sinon, suivez cette suite de commande. Il faut impérativement avoir `npm` :

```bash
makefile migrate <nom de votre db postgres créer en amont>
touch .env <<< blabla db
makefile start
```

Interagissez avec l'api via `http://localhost:4001`

Interagissez avec le client via `http://localhost:3001`
