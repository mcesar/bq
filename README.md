Banco de Questões
=================

Getting started
---------------

Instale o Node.JS. Certifique-se que o mysql esteja executando localmente, com o banco bq criado e que as credenciais sejam root sem senha.

Execute `npm install` na linha de comando, na pasta `server` do projeto, para instalar as dependências.

Para executar o servidor, digite `node .` na linha de comando, na pasta `server` do projeto.

Para testar a comunicação com o servidor, pode-se usar o `curl`. Exemplos:

* obter a lista de bancas cadastradas: `curl -i -k http://localhost:8080/bancas`

Cargos
------

`curl -k -X POST -H 'Content-Type: application/json' -d '{ "Nome_cargo": "APO", "area_atuacao": {"Cod_areaatuacao": "1"}, "area_formacao": {"Cod_areaform": "1" }}' http://localhost:8080/cargos`

`curl -k -X PUT -H 'Content-Type: application/json' -d '{ "Nome_cargo": "APOO", "area_atuacao": {"Cod_areaatuacao": "1"}, "area_formacao": {"Cod_areaform": "1" }}' http://localhost:8080/cargos/1`

`curl -k -X DELETE  http://localhost:8080/cargos/1`

Bancas
------

`curl -k -X POST -H 'Content-Type: application/json' -d '{ "Cod_banca": "Esaf", "Nome_banca": "Esaf"}' http://localhost:8080/bancas`

`curl -k -X PUT -H 'Content-Type: application/json' -d '{ "Cod_banca": "Esaf", "Nome_banca": "Esaff"}' http://localhost:8080/bancas/Esaf`

`curl -k -X DELETE  http://localhost:8080/bancas/Esaf`

Orgãos
------

`curl -k -X POST -H 'Content-Type: application/json' -d '{ "Cod_orgao": "MPOG", "Nome_orgao": "MPOG"}' http://localhost:8080/orgaos`

`curl -k -X PUT -H 'Content-Type: application/json' -d '{ "Cod_banca": "MPOG", "Nome_banca": "MPOGG"}' http://localhost:8080/orgaos/MPOG`

`curl -k -X DELETE  http://localhost:8080/orgaos/MPOG`

Concursos
------

`curl -k -X POST -H 'Content-Type: application/json' -d '{ "Data_abertura": "2013-01-01", "banca": { "Cod_banca": "Esaf"}, "orgao": {"Cod_orgao": "MPOG"}, "cargos": [ { "Cod_cargo": "2" }] }' http://localhost:8080/concursos`

`curl -k -X PUT -H 'Content-Type: application/json' -d '{ "Data_abertura": "2013-01-01", "banca": { "Cod_banca": "Esaf"}, "orgao": {"Cod_orgao": "MPOG"}, "cargos": [ { "Cod_cargo": "3" }] }' http://localhost:8080/concursos/2`

`curl -k -X DELETE  http://localhost:8080/concursos/1`

Provas
------

`curl -k -X POST -H 'Content-Type: application/json' -d '{ "Cod_prova": "1", "concurso": { "Cod_concurso": "1"}, "cargos": [ { "Cod_cargo": "2" }] }' http://localhost:8080/concursos/1/provas`

`curl -k -X PUT -H 'Content-Type: application/json' -d '{ "Cod_prova": "1", "concurso": { "Cod_concurso": "1"}, "cargos": [ { "Cod_cargo": "3" }] }' http://localhost:8080/concursos/1/provas/1`

`curl -k -X DELETE  http://localhost:8080/concursos/1/provas/1`

`curl http://localhost:8080/concursos/1/provas`

Questões
------

`curl -k -X POST -H 'Content-Type: application/json' -d '{ "Numero_questao": "1", "Descricao_q": "bla bla bla", "disciplina": { "Cod_disciplina": "1"} }' http://localhost:8080/concursos/1/provas/1/questoes`

`curl -k -X PUT -H 'Content-Type: application/json' -d '{ "Numero_questao": "1", "Descricao_q": "yada yada yada", "disciplina": { "Cod_disciplina": "1"} }' http://localhost:8080/concursos/1/provas/1/questoes/1`

`curl -k -X DELETE  http://localhost:8080/concursos/1/provas/1/questoes/1`

`curl http://localhost:8080/concursos/1/provas/1/questoes`

Disciplinas
------

`curl -k -X POST -H 'Content-Type: application/json' -d '{ "Nome_disciplina": "Português" }' http://localhost:8080/disciplinas`

`curl -k -X PUT -H 'Content-Type: application/json' -d '{ "Nome_cargo": "APOO", "area_atuacao": {"Cod_areaatuacao": "1"}, "area_formacao": {"Cod_areaform": "1" }}' http://localhost:8080/cargos/1`

`curl -k -X DELETE  http://localhost:8080/cargos/1`


Questão x Professor
------

`curl -k -X POST -H 'Content-Type: application/json' -d '{ "comentario": "aaa", "professor": { "Cod_professor": "1"} }' http://localhost:8080/concursos/1/provas/1/questoes/1/professores`

`curl -k -X PUT -H 'Content-Type: application/json' -d '{ "comentario": "bbb" }' http://localhost:8080/concursos/1/provas/1/questoes/1/professores/1`

`curl -k -X DELETE  http://localhost:8080/concursos/1/provas/1/questoes/1/professores/1`

`curl http://localhost:8080/concursos/1/provas/1/questoes`

Professores
------

`curl -k -X POST -H 'Content-Type: application/json' -d '{ "Nome_professor": "mcesar"}' http://localhost:8080/professores`

`curl -k -X PUT -H 'Content-Type: application/json' -d '{ "Cod_banca": "Esaf", "Nome_banca": "Esaff"}' http://localhost:8080/bancas/Esaf`

`curl -k -X DELETE  http://localhost:8080/bancas/Esaf`