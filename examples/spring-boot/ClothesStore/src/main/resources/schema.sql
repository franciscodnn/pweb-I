create table clothes(
  id bigint auto_increment primary key,
  tipo varchar(50) not null,
  cor varchar(50) not null,
  tamanho varchar(3) not null,
  tecido varchar(50) null
);