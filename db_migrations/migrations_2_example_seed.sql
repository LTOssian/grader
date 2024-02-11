with exampleGroupId as (
    insert into groups (group_id, name)
    values ('5573463f-8b5c-4a11-8bba-243b9b873d14', 'Groupe Exemple')
    returning group_id
)

insert into group_classes (group_id, name, coefficient)
select 
    group_id, 
    unnest(ARRAY[
        'CS50 - Introduction informatique',
        'Concept Backend - API',
        'Langage - TypeScript LV1',
        'Langage - C# LV2',
        'Théâtre - Improvisation',
        'Structure de données et algorithmes',
        'Sport - Art du Cirque'
    ]) as name, 
    unnest(ARRAY[
        2,
        2,
        4,
        4,
        2,
        8,
        2
    ]) as coefficient 
from 
    exampleGroupId;

with exampleGroupId as (
    select group_id
    from groups
    where name = 'Groupe Exemple'
)

insert into students (group_id, firstname, lastname, email)
select 
    group_id, 
    unnest(ARRAY[
        'Jean',
        'Louisan',
        'Sabrina',
        'Eric',
        'Benjamin'
    ]) as firstname, 
    unnest(ARRAY[
        'Dupont',
        'Tchitoula',
        'Attos',
        'Azer',
        'Schinkel'
    ]) as lastname,
    unnest(ARRAY[
        'jd@hetic.eu',
        'lt@hetic.eu',
        'sa@hetic.eu',
        'ea@hetic.eu',
        'bs@hetic.eu'
    ]) as email 
from 
    exampleGroupId;
    