package nl.gridshore.rolling500.searchstats;

import nl.gridshore.rolling500.albums.SearchRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Arrays;
import java.util.List;

/**
 * TODO: Zou nog iets met de sessie id willen doen:
 */
@Service
public class SearchStatsService {
    private static final Logger logger = LoggerFactory.getLogger("STATSLOGGER");

    public void logSearchStats(SearchRequest request, List<String> foundIds, long totalHits, String queryId) {
        List<String> stats = Arrays.asList(
                "S",
                String.valueOf(System.currentTimeMillis()),
                queryId,
                request.getSearchString(),
                String.valueOf(request.getPage()),
                String.valueOf(request.getSize()),
                StringUtils.arrayToDelimitedString(foundIds.toArray(), ";"),
                String.valueOf(totalHits)
        );

        logger.info(StringUtils.arrayToDelimitedString(stats.toArray(), "#"));
    }

    public void logClickStat(String queryId, long albumId) {
        List<String> stats = Arrays.asList(
                "C",
                String.valueOf(System.currentTimeMillis()),
                queryId,
                String.valueOf(albumId)
        );
        logger.info(StringUtils.arrayToDelimitedString(stats.toArray(), "#"));
    }
}
