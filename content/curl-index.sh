#!/bin/bash

curl -XPUT "http://localhost:9200/rolling500" -H 'Content-Type: application/json' -d'
{
  "settings": {
    "number_of_replicas": 0,
    "number_of_shards": 1
  },
  "mappings": {
    "album": {
      "properties": {
        "id": {
          "type": "long"
        },
        "album": {
          "type": "keyword",
          "fields": {
            "analyzed": {
              "type": "text"
            }
          }
        },
        "artist": {
          "type": "keyword",
          "fields": {
            "analyzed": {
              "type": "text"
            }
          }
        },
        "image": {
          "type": "keyword"
        },
        "information": {
          "type": "text"
        },
        "label": {
          "type": "keyword"
        },
        "order": {
          "type": "long"
        },
        "sequence": {
          "type": "long"
        },
        "tags": {
          "type": "keyword"
        },
        "year": {
          "type": "long"
        },
        "clicks": {
          "type": "nested",
          "properties": {
            "term": {
              "type": "keyword"
            },
            "clicks": {
              "type": "long"
            }
          }
        }
      }
    }
  }
}'