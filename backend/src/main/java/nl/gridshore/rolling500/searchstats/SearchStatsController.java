package nl.gridshore.rolling500.searchstats;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/api/searchstats")
public class SearchStatsController {
    private final SearchStatsService searchStatsService;

    @Autowired
    public SearchStatsController(SearchStatsService searchStatsService) {
        this.searchStatsService = searchStatsService;
    }

    @PostMapping
    @ResponseBody
    public String sendClick(@RequestBody ClickRegistrationRequest request) {
        searchStatsService.logClickStat(request.getQueryId(), request.getAlbumId());
        return "OK";
    }
}
