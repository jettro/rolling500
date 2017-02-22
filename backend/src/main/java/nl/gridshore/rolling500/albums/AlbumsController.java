package nl.gridshore.rolling500.albums;

import eu.luminis.elastic.search.SearchByTemplateRequest;
import eu.luminis.elastic.search.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/albums")
public class AlbumsController {

    private final SearchService searchService;

    @Autowired
    public AlbumsController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping
    public List<Album> findAll() {
        SearchByTemplateRequest request = SearchByTemplateRequest.create()
                .setIndexName("rolling500")
                .setTemplateName("find_albums.twig")
                .setAddId(false)
                .setTypeReference(new AlbumEntityTypeReference());

        return searchService.queryByTemplate(request);

//        return Arrays.asList(
//                newAlbum(1,"U2", "October", 1980, "u2.png", "more U2 information","Bounty", 1, 501),
//                newAlbum(1,"Sade", "Smooth Operator", 1975, "sade.png", "more Sade information","Bloom", 2, 500)
//        );
    }

    private Album newAlbum(long id, String artist, String album, long year, String image, String information, String label, long order, long sequence) {
        Album newAlbum = new Album();
        newAlbum.setId(id);
        newAlbum.setArtist(artist);
        newAlbum.setAlbum(album);
        newAlbum.setYear(year);
        newAlbum.setImage("http://localhost:8080/images/" + image);
        newAlbum.setInformation(information);
        newAlbum.setLabel(label);
        newAlbum.setOrder(order);
        newAlbum.setSequence(sequence);

        return newAlbum;
    }
}
