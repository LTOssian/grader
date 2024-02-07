create table if not exists
  groups (
    group_id uuid not null default uuid_generate_v4 (),
    name text not null,
    constraint pk_group_id primary key (group_id)
  );

create table if not exists
  students (
    student_id uuid not null default uuid_generate_v4 (),
    group_id uuid not null,
    firstname text not null,
    lastname text not null,
    email text not null default '',
    constraint pk_student_id primary key (student_id),
    constraint fk_group_id foreign key (group_id) references groups (group_id)
  );

create table if not exists
  group_classes (
    class_id uuid not null default uuid_generate_v4 (),
    group_id uuid not null,
    name text not null,
    coefficient int not null default 1,
    constraint pk_class_id primary key (class_id),
    constraint fk_group_id foreign key (group_id) references groups (group_id)
  );

create table if not exists
  student_grades (
    student_grades_id uuid not null default uuid_generate_v4 (),
    student_id uuid not null,
    report json not null, -- {name of the class : grade}[]
    grade float not null,
    created_at timestamp not null default now (),
    constraint pk_student_grades_id primary key (student_grades_id),
    constraint fk_student_id foreign key (student_id) references students (student_id)
  );
