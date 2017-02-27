Even wat notities om alles met betrekking tot de rolling stone 500 lijst te downloaden.


Met het volgende commando genereren we een file met op elke regel een json document.
curl "http://www.rollingstone.com/music/lists/500-greatest-albums-of-all-time-20120531?json=true&page=1&limit=500" | jq -c '.items|.[]' > rolling.txt

Met script heb ik alle linkjes er uit gehaald en de foto's gedownload
download-images.sh
http://img.wennermedia.com/1200-width/ - base url voor alle plaatjes

Vervolgens met logstash de file bewerken en importeren in elasticsearch.

```
bin/logstash -f /Users/jettrocoenradie/sources/gridshore/workshops/common/rolling500/logstash.conf
rm -rf data/plugins/inputs/file/.sincedb_*
```

