# Referência do pacote

Esse pacote foca na abstração dos métodos mais utilizados para criação de uma API REST utilizando Flask e SQLALCHEMY.

### `api.py` API para APIs:

Exporta classe `ApiView`, Essa classe fornece os métodos essenciais para criação de uma API REST:

- ***get***: refere ao método HTTP GET. Essa função irá entregar os dados referentes a uma entidade.
    - Atributos:
        - `entity_id`: ID da entidade.


- ***post***: refere ao método HTTP POST. Essa função irá criar uma entrada com os dados passados.
    - Atributos:
        - `package`: Pacote JSON/dict para criação da entidade.

- ***delete***: refere ao método HTTP DELETE. Essa função irá deletar a entidade desejada.
    - Atributos:
        - `entity_id`: ID da entidade.

- ***put***: refere ao método HTTP POST. Essa função irá atualizar os dados da entidade desejada.
    - Atributos:
        - `entity_id`: ID da entidade.
        - `package`: Pacote JSON/dict para atualização da entidade.

- ***list***: essa função irá fazer as operações de
  listagem. [API de listagem](https://newgit.aeb.gov.br/sis-aeb/sis-aeb-docs/blob/master/utils/lista.md).
    - Atributos:
        - `data`: Pacote com filtros, sorts, quantidade e página.
        - `base_query`: Opicional. Array com filtros iniciais.

- ***list_entries***: [API de listagem](https://newgit.aeb.gov.br/sis-aeb/sis-aeb-docs/blob/master/utils/lista.md).
    - Atributos:
    - `fields`: Array de filtros (Ver documentação da API).
    - `sorts`: Array de sorts (Ver documentação da API).
    - `offset`: Offset do infinite scroll.
    - `quantity`: Quantidade da página.

- ***parse_entry***: essa função irá transformar um objeto/entidade SQLALCHEMY em um dicionário.
    - Atributos:
        - `entry`: Objeto da entidade SQLALCHEMY.

#### Criação de uma instância:

Para a criação de uma instância dessa classe, os seguintes atributos são necessários:

- `class_instance`: Instância da entidade foco.
- `identifier_attr`: Atributo/chave/campo de identificação da entidade.
- `relationships`: Relacionamentos da entidade.
  - ```json
    [{"key": "string", "instance": "Class instance"}]
    ```
  - `key`: chave do relacionamento dentro da entidade foco.
  - `instance`: Instância do objeto SQLALCHEMY da entidade do relacionamento.
    
- `db`: Instância do banco SQLAlchemy.
- `on_data_change`: Método que será executado toda vez que algum dado da entidade foco for alterado.