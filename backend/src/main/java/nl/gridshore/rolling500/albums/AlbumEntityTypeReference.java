package nl.gridshore.rolling500.albums;

import com.fasterxml.jackson.core.type.TypeReference;
import eu.luminis.elastic.search.response.QueryResponse;

public class AlbumEntityTypeReference extends TypeReference<QueryResponse<Album>> {
}
