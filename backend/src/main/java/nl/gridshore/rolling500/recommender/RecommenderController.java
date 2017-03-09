package nl.gridshore.rolling500.recommender;

import nl.gridshore.rolling500.albums.Album;
import nl.gridshore.rolling500.albums.AlbumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/recommender")
public class RecommenderController {
    public static final double SCORE_THRESHOLD = 0.5;
    private final RecommenderService recommenderService;
    private final AlbumService albumService;

    @Autowired
    public RecommenderController(RecommenderService recommenderService, AlbumService albumService) {
        this.recommenderService = recommenderService;
        this.albumService = albumService;
    }


    @GetMapping("/user/{id}")
    public List<Album> obtainRecommendations(@PathVariable String id) {
        List<RecommendedItem> recommend = this.recommenderService.recommend(id);
        List<Long> ids = recommend.stream()
                .filter(recommendedItem -> recommendedItem.getScore() > SCORE_THRESHOLD)
                .map(item -> item.getAlbumId()).collect(Collectors.toList());

        List<Album> recommendedAlbums = albumService.findAlbumBySequenceId(ids);

        return recommendedAlbums.stream().map(album -> {
            RecommendedAlbum recAlbum = new RecommendedAlbum();
            recAlbum.setArtist(album.getArtist());
            recAlbum.setAlbum(album.getAlbum());
            recAlbum.setYear(album.getYear());
            recAlbum.setSequence(album.getSequence());
            recAlbum.setId(album.getId());
            recAlbum.setImage(album.getImage());
            recAlbum.setLabel(album.getLabel());
            recAlbum.setOrder(album.getOrder());
            RecommendedItem item = recommend.stream()
                    .filter(recommendedItem -> recommendedItem.getAlbumId() == album.getSequence())
                    .findFirst()
                    .get();
            recAlbum.setScore(item.getScore());

            return recAlbum;
        }).collect(Collectors.toList());
    }
}
