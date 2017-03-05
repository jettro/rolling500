package nl.gridshore.rolling500.albums;

import com.fasterxml.jackson.core.type.TypeReference;
import eu.luminis.elastic.document.response.GetByIdResponse;

public class AlbumByIdTypeReference extends TypeReference<GetByIdResponse<Album>> {
}
