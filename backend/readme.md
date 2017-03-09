Even een plekje voor wat notities die ik niet kwijt wil raken:

```
curl -XPUT "http://localhost:9200/ratings" -d'
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
```

```
PUT evidences
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
}
```