package nl.gridshore.rolling500.albums;

import com.fasterxml.jackson.core.type.TypeReference;
import eu.luminis.elastic.search.response.HitsResponse;
import eu.luminis.elastic.search.response.query.ElasticQueryResponse;

public class AlbumEntityTypeReference extends TypeReference<ElasticQueryResponse<Album>> {
}
