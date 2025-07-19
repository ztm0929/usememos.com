---
title: Container Install
---

此文档提供了使用 Docker 部署 Memos 的基本指南。

## 先决条件

- **拥有一台安装了 [Docker](https://www.docker.com) 的服务器**

## Docker Run

要使用 `docker run` 设置 Memos，请执行以下命令以启动 Memos：

```bash
docker run -d \
  --init \
  --name memos \
  --publish 5230:5230 \
  --volume ~/.memos/:/var/opt/memos \
  neosmemo/memos:stable
```

这份命令将会在后台启动 Memos，并将其暴露在 **5230** 端口。数据将存储在 **~/.memos/** 中，这是用户主目录下的一个隐藏目录。

{% admonition icon="note" title="注意" %}
Memos 支持调整进阶的 [runtime 选项](/docs/install/runtime-options) 来自定义服务器行为。
{% /admonition %}

## Docker Compose

要使用 `docker compose` 部署 Memos，请创建一个 `docker-compose.yml` 文件，并使用以下配置：

```yaml
services:
  memos:
    image: neosmemo/memos:stable
    container_name: memos
    volumes:
      - ~/.memos/:/var/opt/memos
    ports:
      - 5230:5230
```

接下来，执行 `docker compose up -d` 以启动 Memos。虽然您可以修改端口和数据目录，但请仅修改前面的端口号（例如，`8081:5230` 中的 `8081`），用于指定主机暴露的端口；后面的端口表示容器内 Memos 实际监听的端口。目录路径的含义类似，前者是主机上的路径，后者是容器内部的路径。

## 在 Windows 上使用 Docker

只要您有足够的 RAM，就可以使用 [Docker Desktop](https://www.docker.com/products/docker-desktop/) 来运行 Memos。

{% admonition icon="important" title="重要提示" %}
如果希望将数据直接保存在主机上，可使用 /c/Users/<用户名>/memos/ 或任何有效的 Windows 绝对路径。
{% /admonition %}

### Docker Run on PowerShell

```
docker run -d `
  --init `
  --name memos `
  --publish 5230:5230 `
  --volume $Env:USERPROFILE\memos:/var/opt/memos `
  neosmemo/memos:stable
```
