package nl.gridshore.rolling500.albums;

import eu.luminis.elastic.document.DocumentService;
import eu.luminis.elastic.document.QueryByIdRequest;
import eu.luminis.elastic.search.SearchByTemplateRequest;
import eu.luminis.elastic.search.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AlbumService {
    private static final String INDEX = "rolling500";
    private static final String TYPE = "album";

    private final SearchService searchService;
    private final DocumentService documentService;

    @Autowired
    public AlbumService(SearchService searchService, DocumentService documentService) {
        this.searchService = searchService;
        this.documentService = documentService;
    }

    public List<Album> findPaginatedAlbums(Long page, int size) {
        return doQueryAlbums("find_albums.twig", page, size);
    }

    public List<Album> findAllAlbums(Long page, int size) {
        return doQueryAlbums("find_all_albums.twig",1L, 501);
    }

    public Album findAlbumById(long id) {
        QueryByIdRequest queryByIdRequest = new QueryByIdRequest(INDEX, TYPE, String.valueOf(id));
        queryByIdRequest.setTypeReference(new AlbumByIdTypeReference());

        return documentService.queryById(queryByIdRequest);

    }

    private List<Album> doQueryAlbums(String templateName, Long page, Integer size) {
        Map<String, Object> params = new HashMap<>();
        if (page != null) {
            params.put("from", (page - 1) * size);
            params.put("size", size);
        }
        SearchByTemplateRequest request = SearchByTemplateRequest.create()
                .setIndexName(INDEX)
                .setTemplateName(templateName)
                .setAddId(false)
                .setModelParams(params)
                .setTypeReference(new AlbumEntityTypeReference());

        return searchService.queryByTemplate(request);
    }

    public List<Album> findAlbumBySequenceId(List<Long> ids) {
        Map<String, Object> params = new HashMap<>();
        params.put("ids", ids);
        params.put("size", 5);

        SearchByTemplateRequest request = SearchByTemplateRequest.create()
                .setIndexName(INDEX)
                .setTemplateName("find_albums_by_sequence.twig")
                .setAddId(false)
                .setModelParams(params)
                .setTypeReference(new AlbumEntityTypeReference());

        return searchService.queryByTemplate(request);
    }
}
