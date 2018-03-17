package nl.gridshore.rolling500.searchstats;

import eu.luminis.elastic.document.SingleClusterDocumentService;
import eu.luminis.elastic.document.UpdateRequest;
import nl.gridshore.rolling500.albums.Album;
import nl.gridshore.rolling500.albums.AlbumService;
import nl.gridshore.rolling500.albums.Click;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

import static nl.gridshore.rolling500.albums.AlbumService.INDEX;
import static nl.gridshore.rolling500.albums.AlbumService.TYPE;

@Controller
@RequestMapping("/api/searchstats")
public class SearchStatsController {

    private final SearchStatsService searchStatsService;
    private final SingleClusterDocumentService documentService;
    private final AlbumService albumService;

    @Autowired
    public SearchStatsController(SearchStatsService searchStatsService, SingleClusterDocumentService documentService, AlbumService albumService) {
        this.searchStatsService = searchStatsService;
        this.documentService = documentService;
        this.albumService = albumService;
    }

    @PostMapping
    @ResponseBody
    public String sendClick(@RequestBody ClickRegistrationRequest request) {
        long albumId = request.getAlbumId();

        searchStatsService.logClickStat(request.getQueryId(), albumId, request.getUserId());

        Album album = albumService.findAlbumById(albumId);
        if (album != null) {
            incrementClick(album, request);
            documentService.update(new UpdateRequest(INDEX, TYPE, String.valueOf(albumId)).setEntity(album));
        }

        return "OK";
    }

    private void incrementClick(Album album, ClickRegistrationRequest request) {
        List<Click> clicks = album.getClicks();
        Click click = null;
        if (clicks == null || clicks.isEmpty()) {
            clicks = new ArrayList<>();
            click = initEmptyClick(request);
        } else {
            int foundIndex = -1;
            for (int index = 0; index < clicks.size(); index++) {
                click = clicks.get(index);
                if (click.getTerm().equalsIgnoreCase(request.getSearchString())) {
                    click.setClicks(click.getClicks() + 1);
                    foundIndex = index;
                    break;
                }
            }
            if (foundIndex != -1) {
                clicks.remove(foundIndex);
            } else {
                click = initEmptyClick(request);
            }
        }

        clicks.add(click);
        album.setClicks(clicks);
    }

    private Click initEmptyClick(ClickRegistrationRequest request) {
        Click click = new Click();
        click.setTerm(request.getSearchString());
        click.setClicks(1L);
        return click;
    }

}
