package nl.gridshore.rolling500.searchstats;

import nl.gridshore.rolling500.albums.SearchRequest;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Arrays;
import java.util.List;

/**
 * TODO: Zou nog iets met de sessie id willen doen:
 */
@Service
public class SearchStatsService {
    public void logSearchStats(SearchRequest request, List<String> foundIds, long totalHits, String queryId) {
        List<String> stats = Arrays.asList(
                String.valueOf(System.currentTimeMillis()),
                queryId,
                request.getSearchString(),
                String.valueOf(request.getPage()),
                String.valueOf(request.getSize()),
                StringUtils.arrayToDelimitedString(foundIds.toArray(), ";"),
                String.valueOf(totalHits)
        );

        System.out.println(StringUtils.arrayToDelimitedString(stats.toArray(), "#"));
    }

    public void logClickStat(String queryId, long albumId) {
        List<String> stats = Arrays.asList(
                String.valueOf(System.currentTimeMillis()),
                queryId,
                String.valueOf(albumId)
        );
        System.out.println(StringUtils.arrayToDelimitedString(stats.toArray(), "#"));
    }
}
