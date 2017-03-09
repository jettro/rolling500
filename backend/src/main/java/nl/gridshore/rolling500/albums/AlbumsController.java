package nl.gridshore.rolling500.albums;

import eu.luminis.elastic.document.DocumentService;
import eu.luminis.elastic.document.QueryByIdRequest;
import eu.luminis.elastic.search.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/albums")
public class AlbumsController {
    private static final String INDEX = "rolling500";
    private static final String TYPE = "album";
    private static final int SIZE = 10;

    private final AlbumService albumService;
    private final DocumentService documentService;

    @Autowired
    public AlbumsController(AlbumService albumService, DocumentService documentService) {
        this.albumService = albumService;
        this.documentService = documentService;
    }

    @GetMapping
    public List<Album> find(Long page) {
        return albumService.findPaginatedAlbums(page, SIZE);
    }

    @GetMapping("/all")
    public List<Album> findAll() {
        return albumService.findAllAlbums(1L, 501);
    }

    @GetMapping("/sequence/{ids}")
    public List<Album> obtainBySequence(@PathVariable List<Long> ids) {
        return albumService.findAlbumBySequenceId(ids);
    }

    @GetMapping("/{id}")
    public Album obtainById(@PathVariable Long id) {
        return albumService.findAlbumById(id);
    }

}
