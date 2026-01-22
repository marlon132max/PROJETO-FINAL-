-- =========================
-- USUARIO
-- =========================
create table usuario (
  id_usuario uuid primary key,
  nome_usu varchar(100) not null,
  email_usu varchar(100) unique not null,
  senha_usu varchar(255),
  data_criacao_usu timestamp default now(),
  tipo_usu varchar(20)
);

-- =========================
-- INTERESSE
-- =========================
create table interesse (
  id_interesse serial primary key,
  nome_interesse varchar(100) not null
);

-- =========================
-- USUARIO_INTERESSE
-- =========================
create table usuario_interesse (
  usuario_id uuid references usuario(id_usuario),
  interesse_id int references interesse(id_interesse),
  primary key (usuario_id, interesse_id)
);

-- =========================
-- CAMINHO
-- =========================
create table caminho (
  id serial primary key,
  nome varchar(100),
  descricao text
);

-- =========================
-- CIDADE
-- =========================
create table cidade (
  id uuid primary key default gen_random_uuid(),
  nome varchar(100),
  estado char(2),
  latitude numeric,
  longitude numeric,
  caminho_id int references caminho(id)
);

-- =========================
-- PONTO_HISTORICO
-- =========================
create table ponto_historico (
  id uuid primary key default gen_random_uuid(),
  nome varchar(100),
  descricao text,
  cidade_id uuid references cidade(id)
);

-- =========================
-- CONTEUDO_HISTORICO
-- =========================
create table conteudo_historico (
  id uuid primary key default gen_random_uuid(),
  titulo varchar(150),
  texto text,
  referencia text,
  cidade_id uuid references cidade(id)
);

-- =========================
-- ROTEIRO
-- =========================
create table roteiro (
  id uuid primary key default gen_random_uuid(),
  titulo varchar(150),
  user_id uuid references usuario(id_usuario),
  caminho_id int references caminho(id),
  criado_em timestamp default now()
);

-- =========================
-- ROTEIRO_ITEM
-- =========================
create table roteiro_item (
  id uuid primary key default gen_random_uuid(),
  roteiro_id uuid references roteiro(id),
  cidade_id uuid references cidade(id),
  ordem int
);

-- =========================
-- AVALIACAO
-- =========================
create table avaliacao (
  id uuid primary key default gen_random_uuid(),
  nota int,
  comentario text,
  user_id uuid references usuario(id_usuario),
  roteiro_id uuid references roteiro(id)
);

-- =========================
-- PERFIL
-- =========================
create table perfil (
  id uuid primary key references usuario(id_usuario),
  nome varchar(100),
  tipo_viajante varchar(50),
  criado_em timestamp default now()
);