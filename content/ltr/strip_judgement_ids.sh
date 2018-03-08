#!/usr/bin/env bash
curl -XGET "http://localhost:9200/rolling500/_search" -H 'Content-Type: application/json' -s  -d'
{
  "query": {
    "multi_match": {
      "query": "metal",
      "fields": [
        "album.analyzed",
        "artist.analyzed",
        "information"
      ]
    }
  },
  "_source": {
    "includes": [
      "id",
      "album",
      "artist",
      "clicks"
    ]
  },
  "size": 20
}' | jq '.hits.hits | .[] | "0 qid:4 # ", ._source.id, " ",._source.artist, "-",._source.album, "###"' -j