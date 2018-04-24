#!/bin/bash

curl -XPUT "http://localhost:9200/implicitfeedback" -H 'Content-Type: application/json' -d'
{
  "settings": {
    "number_of_replicas": 0,
    "number_of_shards": 1
  },
  "mappings": {
    "doc": {
      "properties": {
        "type": {
          "type": "keyword"
        },
        "album_id": {
          "type": "keyword"
        },
        "user_id": {
          "type": "keyword"
        },
        "query_id": {
          "type": "keyword"
        },
        "event_time": {
          "type": "date"
        },
        "total_hits": {
          "type": "long"
        },
        "search_string": {
          "type": "keyword",
          "fields": {
            "analyzed": {
              "type": "text"
            }
          }
        },
        "request_page": {
          "type": "long"
        },
        "request_size": {
          "type": "long"
        },
        "position": {
          "type": "integer"
        }
      }
    }
  }
}'