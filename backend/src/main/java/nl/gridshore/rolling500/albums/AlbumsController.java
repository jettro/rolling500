package nl.gridshore.rolling500.albums;

import eu.luminis.elastic.document.DocumentService;
import eu.luminis.elastic.document.QueryByIdRequest;
import eu.luminis.elastic.search.SearchByTemplateRequest;
import eu.luminis.elastic.search.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/albums")
public class AlbumsController {
    private static final String INDEX = "rolling500";
    private static final String TYPE = "album";
    private static final int SIZE = 10;

    private final SearchService searchService;
    private final DocumentService documentService;

    @Autowired
    public AlbumsController(SearchService searchService, DocumentService documentService) {
        this.searchService = searchService;
        this.documentService = documentService;
    }

    @GetMapping
    public List<Album> find(Long page) {
        return doQueryAlbums("find_albums.twig",page, SIZE);
    }

    @GetMapping("/all")
    public List<Album> findAll() {
        return doQueryAlbums("find_all_albums.twig",1L, 501);
    }

    @GetMapping("/{id}")
    public Album obtainById(@PathVariable Long id) {
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
                .setIndexName("rolling500")
                .setTemplateName(templateName)
                .setAddId(false)
                .setModelParams(params)
                .setTypeReference(new AlbumEntityTypeReference());

        return searchService.queryByTemplate(request);
    }

}
