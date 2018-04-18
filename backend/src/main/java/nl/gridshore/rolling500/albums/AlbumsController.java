package nl.gridshore.rolling500.albums;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/albums")
public class AlbumsController {
    private static final int SIZE = 10;

    private final AlbumService albumService;

    @Autowired
    public AlbumsController(AlbumService albumService) {
        this.albumService = albumService;
    }

    @GetMapping
    public List<Album> find(Long page) {
        return albumService.findPaginatedAlbums(page, SIZE);
    }

    @GetMapping("/all")
    public List<Album> findAll() {
        return albumService.findAllAlbums();
    }

    @GetMapping("/sequence/{ids}")
    public List<Album> obtainBySequence(@PathVariable List<Long> ids) {
        return albumService.findAlbumBySequenceId(ids);
    }

    @GetMapping("/{id}")
    public Album obtainById(@PathVariable Long id) {
        return albumService.findAlbumById(id);
    }

    @PostMapping("/search")
    public SearchResult search(@RequestBody SearchRequest request) {
        return albumService.searchAlbums(request);
    }

    @GetMapping("/ltrmodels")
    public List<LtrModel> obtainAvailableModels() {
        return albumService.findLtrModels();
    }

    @GetMapping("/random")
    public List<Album> obtainRandomAlbums() {
        return albumService.findRandomAlbums();
    }
}
