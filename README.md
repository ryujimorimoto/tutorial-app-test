## postgresql をインストール

$ brew install postgresql@13
$ echo 'export PATH="/usr/local/opt/postgresql@13/bin:$PATH"' >> ~/.zshrc 
$ source ~/.zshrc
$ brew services start postgresql@13
$ psql postgres
postgres=# create user techgeek with password '' superuser createdb createrole login;
\q で出る。
postgres=# create database sampledb;
\q で出る。
$ psql sampledb -U techgeek
postgres=# create table histories(id serial not null, new_price integer);

## $ npm install pg

-
-
-
-
-
-
-
-

# 目標

変更履歴を作る
バックエンド側の処理を作る

ルーターの定義
koa-body のインストール
テスト動作を作る

API を叩くために、axios を利用する

もしバックエンドとフロントエンドでドメインが異なる場合、
server.js に CORS を設定する必要がある。
サーバーレス構成にするなどの場合に必要。

今回は同じサーバー上にフロントもバックエンドも構築するので、
CORS を設定する必要はない。

フロント側環境変数を読み込むために
next.config.js に env を設定する

appRouter の位置は、nextjs のルーティング設定を読み込む前に定義する必要がある。
つまり、appRouter でルーティングが見つからない場合には nextjs にルーティング定義になる。

## postgresql をインストール

$ brew install postgresql@13
$ echo 'export PATH="/usr/local/opt/postgresql@13/bin:$PATH"' >> ~/.zshrc 
$ source ~/.zshrc
$ brew services start postgresql@13
$ psql
postgres=# create user testuser with password '' superuser createdb createrole login;
postgres=# create database testdb;
postgres=# create table histories(id serial not null, new_price integer);
\q で出る。

$ npm install pg

## postgresql の接続

import { Client } from "pg";
const client = new Client({
user: 'ユーザー名',
host: 'localhost',
database: 'データベース名',
password: '',
port: 5432
});

client.connect();

module.exports = {
client
}

## フロント側のデータ取得

useEffect でデータ取得。
登録は axios

# Shopify App Node

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE.md)
[![Build Status](https://travis-ci.com/Shopify/shopify-app-node.svg?branch=master)](https://travis-ci.com/Shopify/shopify-app-node)

Boilerplate to create an embedded Shopify app made with Node, [Next.js](https://nextjs.org/), [Shopify-koa-auth](https://github.com/Shopify/quilt/tree/master/packages/koa-shopify-auth), [Polaris](https://github.com/Shopify/polaris-react), and [App Bridge React](https://shopify.dev/tools/app-bridge/react-components).

## Installation

Using the [Shopify CLI](https://github.com/Shopify/shopify-cli) run:

```sh
~/ $ shopify node create -n APP_NAME
```

Or, fork and clone repo

## Requirements

- If you don’t have one, [create a Shopify partner account](https://partners.shopify.com/signup).
- If you don’t have one, [create a Development store](https://help.shopify.com/en/partners/dashboard/development-stores#create-a-development-store) where you can install and test your app.
- In the Partner dashboard, [create a new app](https://help.shopify.com/en/api/tools/partner-dashboard/your-apps#create-a-new-app). You’ll need this app’s API credentials during the setup process.

## Usage

This repository is used by [Shopify CLI](https://github.com/Shopify/shopify-cli) as a scaffold for Node apps. You can clone or fork it yourself, but it’s faster and easier to use Shopify App CLI, which handles additional routine development tasks for you.

## License

This respository is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
