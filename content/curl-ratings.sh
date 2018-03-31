#!/bin/bash

curl -XPUT "http://localhost:19200/ratings" -H 'Content-Type: application/json' -d'
{
  "settings": {
    "number_of_replicas": 0,
    "number_of_shards": 1
  },
  "mappings": {
    "rating": {
      "properties": {
        "user_id": {
          "type": "keyword"
        },
        "ratings": {
          "type": "keyword"
        }
      }
    }
  }
}'

curl -XPOST "http://localhost:19200/_reindex" -H 'Content-Type: application/json' -d '
{
  "source": {
    "index": "ratings-20170319102926"
  },
  "dest": {
    "index": "ratings-20170319103826"
  }
}'

curl -XPOST 'http://localhost:19200/_aliases?pretty' -H 'Content-Type: application/json' -d'
{
    "actions" : [
      { "remove" : { "index" : "ratings-20170319102926", "alias" : "ratings" } },
        { "add" : { "index" : "ratings-20170319103826", "alias" : "ratings" } }
    ]
}
'

