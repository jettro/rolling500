package nl.gridshore.rolling500.albums;

import eu.luminis.elastic.search.SearchByTemplateRequest;
import eu.luminis.elastic.search.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/albums")
public class AlbumsController {

    public static final int SIZE = 10;
    private final SearchService searchService;

    @Autowired
    public AlbumsController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping
    public List<Album> findAll(Long page) {
        Map<String, Object> params = new HashMap<>();
        if (page != null) {
            params.put("from", (page - 1) * SIZE);
            params.put("size", SIZE);
        }
        SearchByTemplateRequest request = SearchByTemplateRequest.create()
                .setIndexName("rolling500")
                .setTemplateName("find_albums.twig")
                .setAddId(false)
                .setModelParams(params)
                .setTypeReference(new AlbumEntityTypeReference());

        return searchService.queryByTemplate(request);
    }
}
