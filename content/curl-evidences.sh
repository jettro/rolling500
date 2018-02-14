#!/bin/bash

curl -XPUT "http://localhost:9200/evidences" -H 'Content-Type: application/json' -d'
{
  "settings": {
    "number_of_replicas": 0,
    "number_of_shards": 1
  },
  "mappings": {
    "evidence": {
      "properties": {
        "rating": {
          "properties": {
            "user_id": {
              "type": "keyword"
            },
            "album_id": {
              "type": "long"
            },
            "emotion": {
              "type": "long"
            },
            "evidence_name": {
              "type": "keyword"
            }
          }
        }
      }
    }
  }
}'