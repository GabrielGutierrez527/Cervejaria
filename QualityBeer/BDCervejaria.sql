CREATE DATABASE cervejaria;
USE cervejaria;

CREATE TABLE cerveja (
  idCerveja INT PRIMARY KEY AUTO_INCREMENT,
  datahora DATETIME DEFAULT CURRENT_TIMESTAMP,
  maceracao FLOAT,
  malteacao1 FLOAT,
  malteacao2 FLOAT,
  malteacao3 FLOAT,
  moagem FLOAT,
  brassagem1 FLOAT,
  brassagem2 FLOAT,
  brassagem3 FLOAT,
  fervura FLOAT,
  resfriamento_fermentacao1 FLOAT,
  resfriamento_fermentacao2 FLOAT,
  resfriamento_fermentacao3 FLOAT,
  maturacao_filtracao FLOAT,
  pasteurizacao FLOAT,
  envase FLOAT
);