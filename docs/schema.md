# Schema Information

## notes
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
body        | text      | not null
notebook_id | integer   | not null, foreign key (references notebooks), indexed
archived    | boolean   | not null, default: false

## notebooks
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (references users), indexed
title       | string    | not null
description | string    |

## reminders
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
note_id     | string    | not null, foreign key (references notes), indexed
date        | datetime  | not null
type        | string    | not null

## tags
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null
note_id     | integer   | not null, foreign key (references notes), indexed, unique [tag_id]

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
