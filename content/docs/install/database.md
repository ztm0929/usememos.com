---
title: Database 驱动
---

Memos 支持以下数据库类型：

- SQLite（默认）
- MySQL（从 Memos 版本 0.16.1 开始支持）
- PostgreSQL（从 Memos 版本 0.18.0 开始支持）

## Memos 搭配 MySQL

> 推荐使用 MySQL 8.0 或更高版本。默认字符集和排序规则分别为 `utf8mb4` 和 `utf8mb4_unicode_ci`。

默认情况下，Memos 使用 SQLite 作为数据库驱动程序。要更改为 MySQL，您可以使用以下步骤：

- **--driver** _mysql_ : 此参数指定 Memos 应使用 `mysql` 驱动程序，而不是默认的 `sqlite`。

- **--dsn** _dbuser:dbpass@tcp(dbhost)/dbname_ : 提供 MySQL 服务器的连接详细信息。

您可以使用以下命令通过 Docker 启动 Memos：

```shell
docker run -d \
  --name memos \
  --publish 5230:5230 \
  --volume ~/.memos/:/var/opt/memos \
  neosmemo/memos:stable \
  --driver mysql \
  --dsn 'root:password@tcp(localhost)/memos_prod'
```

Additionally, you can set these configurations via environment variables:

```shell
MEMOS_DRIVER=mysql
MEMOS_DSN=root:password@tcp(localhost)/memos_prod
```

## Using PostgreSQL

Starting from version 0.18.0, Memos also supports PostgreSQL as a database driver. To switch to PostgreSQL, you can use the following steps:

- **--driver** _postgres_ : This argument specifies that Memos should use the `postgres` driver instead of the default `sqlite`.

- **--dsn** _postgresql://postgres:PASSWORD@localhost:5432/memos_ : Provides the connection details for your PostgreSQL server.

You can start Memos with Docker using the following command:

```shell
docker run -d --name memos -p 5230:5230 -v ~/.memos/:/var/opt/memos neosmemo/memos:stable --driver postgres --dsn 'postgresql://postgres:PASSWORD@localhost:5432/memos'
```

Additionally, you can set these configurations via environment variables:

```shell
MEMOS_DRIVER=postgres
MEMOS_DSN=postgresql://root:password@localhost:5432/memos
```

Note that if the PostgreSQL server is not configured to support SSL connections you will need to add `?sslmode=disable` to the DSN.

Choose the database driver that best suits your needs and configure Memos accordingly.

## Docker Compose Example

The `compose.yml` below demonstrates the usage of Memos with a PostgreSQL database.

```yml
version: "3.0"
services:
  memos:
    image: neosmemo/memos:stable
    restart: always
    depends_on:
      - db
    ports:
      - 5230:5230
    environment:
      - MEMOS_DRIVER=postgres
      - MEMOS_DSN=user=memos password=secret dbname=memosdb host=db sslmode=disable

  db:
    image: postgres:16.1
    restart: unless-stopped
    volumes:
      - "./database:/var/lib/postgresql/data/"
    environment:
      POSTGRES_USER: memos
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: memosdb
```

## Migrating data between different drivers

You can do this with some scripting language, for example I used ChatGPT to help me implement a SQLite to MySQL Python script: [SQLite to MySQL Migration](https://chat.openai.com/share/5a9b9e03-3666-4eb2-b9d9-31688729fcd3).

Similarly, you can make a SQLite to PostgreSQL script.
