The scripts in this part are copied and slightly modified from the Learning To Rank project. The  goal is to make the
scripts more configurable and then add them back to the original project.

https://github.com/o19s/elasticsearch-learning-to-rank


Opschrijven wat we doen om de LTR plugin te gebruiken:

We moeten dus een rijtje maken met queries en de juiste volgorde die ze zouden moeten hebben. Dan kunnen we vervolgens met deze ids een logging query doen en waarden hieruit parsen. 

Vervolgens moeten we hem in het format zetten dat we kunnen gebruiken om het model te trainen.
4   qid:1   1:9.8376875     2:12.318446 # 7555  rambo
3   qid:1   1:10.7808075    2:9.510193  # 1370  rambo
3   qid:1   1:10.7808075    2:6.8449354 # 1369  rambo
3   qid:1   1:10.7808075    2:0.0       # 1368  rambo

Zouden we hier dan ook een volgorde kunnen maken? Aan de andere kant is het zo wel handig om gebruikers input mee te nemen.

Aanmaken feature set
```
POST _ltr/_featureset/rolling_features_1
{
  "validation": {
    "params": {
      "keywords": "u2"
    },
    "index": "rolling500"
  },
  "featureset": {
    "features": [
      {
        "name": "artist_query",
        "params": [
          "keywords"
        ],
        "template_language": "mustache",
        "template": {
          "match": {
            "artist.analyzed": "{{keywords}}"
          }
        }
      },
      {
        "name": "album_query",
        "params": [
          "keywords"
        ],
        "template_language": "mustache",
        "template": {
          "match": {
            "album.analyzed": "{{keywords}}"
          }
        }
      },
      {
        "name": "information_query",
        "params": [
          "keywords"
        ],
        "template_language": "mustache",
        "template": {
          "match": {
            "information": "{{keywords}}"
          }
        }
      }
    ]
  }
}
```

Query om features te loggen:
```
GET rolling500/_search
{
  "query": {
    "bool": {
      "filter": [
        {
          "terms": {
            "_id": [
              "350967",
              "350696",
              "351003",
              "350640",
              "351098",
              "350897",
              "351105",
              "351029"
            ]
          }
        },
        {
          "sltr": {
            "_name": "logged_featureset",
            "featureset": "rolling_features_1",
            "params": {
              "keywords": "u2"
            }
          }
        }
      ]
    }
  },
  "ext": {
    "ltr_log": {
      "log_specs": {
        "name": "log_entry1",
        "named_query": "logged_featureset"
      }
    }
  }
}
```

Verder veel van de python dingen gebruikt, vooral het leren van de modellen nog even goed bekijken. Maar met de volgende query kunnen we dan eenvoudig zien dat het resultaat beter is geworden

```
GET rolling500/_search
{
  "query": {
    "multi_match": {
      "query": "u2",
      "fields": ["album.analyzed", "artist.analyzed", "information"]
    }
  },
  "_source": {
    "includes": ["id","album", "artist"]
  },
  "rescore": {
    "window_size": 1000,
     "query": {
            "rescore_query": {
                "sltr": {
                    "params": {
                        "keywords": "u2"
                    },
                    "model": "test_0"
                }
            }
        }
  }
}
```
