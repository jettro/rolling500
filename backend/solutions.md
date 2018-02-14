
```
GET /rolling500/_analyze
{
  "field": "information",
  "text": "compelling melodies in songs like \"Masters of War\" and \"Blowin' in the Wind\""
}

# Most basic query, the match all query
GET /rolling500/_search

#or (Check the score, which is 1 for all docs in match_all)
GET /rolling500/_search
{
  "query": {
    "match_all": {}
  }
}

# Now add a filter using the bool query
# (Check the score, 0 for all because of the filter)
GET /rolling500/_search
{
  "query": {
    "bool": {
      "filter": {
        "range": {
          "year": {
            "gte": 1970,
            "lte": 1979
          }
        }
      }
    }
  }
}

# Add the match query for information field
GET /rolling500/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "information": "war"
          }
        }
      ],
      "filter": {
        "range": {
          "year": {
            "gte": 1970,
            "lte": 1979
          }
        }
      }
    }
  }
}

# Search in title as well as information and make hits
# in title more important.
GET /rolling500/_search
{
  "query": {
    "multi_match": {
      "query": "war",
      "fields": ["album.analyzed^5", "information"]
    }
  }
}

# Signal based on the year it was released
# Origin is where to start from
# scale is the maximum distance, everythin over that is zero
GET /rolling500/_search?filter_path=hits.hits._score,hits.hits._source
{
  "query": {
    "bool": {
      "must": [
        {
          "function_score": {
            "query": {
              "match": {
                "information": "war"
              }
            },
            "functions": [
              {
                "linear": {
                  "year": {
                    "origin": "1980",
                    "scale": "10"
                  }
                }
              }
            ]
          }
        }
      ],
      "filter": {
        "range": {
          "year": {
            "gte": 1970,
            "lte": 1979
          }
        }
      }
    }
  },
  "_source": {
    "includes": ["artist","album","year","order"]
  }
}

# Signal based on the location in the charts
# Origin is zero as we start from 1
# Scale is 500, which is the total length of the chart
GET /rolling500/_search?filter_path=hits.hits._score,hits.hits._source
{
  "query": {
    "bool": {
      "must": [
        {
          "function_score": {
            "query": {
              "match": {
                "information": "war"
              }
            },
            "functions": [
              {
                "linear": {
                  "order": {
                    "origin": "0",
                    "scale": "500"
                  }
                }
              }
            ]
          }
        }
      ],
      "filter": {
        "range": {
          "year": {
            "gte": 1970,
            "lte": 1979
          }
        }
      }
    }
  },
  "_source": {
    "includes": ["artist","album","year","order"]
  }
}
```