package nl.gridshore.rolling500.albums;

import eu.luminis.elastic.document.QueryByIdRequest;
import eu.luminis.elastic.document.SingleClusterDocumentService;
import eu.luminis.elastic.search.SearchByTemplateRequest;
import eu.luminis.elastic.search.SingleClusterSearchService;
import eu.luminis.elastic.search.response.HitsAggsResponse;
import eu.luminis.elastic.search.response.HitsResponse;
import eu.luminis.elastic.search.response.aggregations.bucket.TermsAggregation;
import nl.gridshore.rolling500.dashboard.KeyValuePair;
import nl.gridshore.rolling500.searchstats.SearchStatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AlbumService {
    public static final String INDEX = "rolling500";
    public static final String TYPE = "album";

    private final SingleClusterSearchService searchService;
    private final SingleClusterDocumentService documentService;
    private final SearchStatsService searchStatsService;

    @Autowired
    public AlbumService(SingleClusterSearchService searchService, SingleClusterDocumentService documentService, SearchStatsService searchStatsService) {
        this.searchService = searchService;
        this.documentService = documentService;
        this.searchStatsService = searchStatsService;
    }

    public SearchResult searchAlbums(SearchRequest request) {
        Map<String, Object> params = new HashMap<>();
        long page = request.getPage();
        int size = request.getSize();
        if (page > 0) {
            params.put("from", (page - 1) * size);
            params.put("size", size);
        }
        if (StringUtils.hasLength(request.getSearchString())) {
            params.put("search", request.getSearchString());
        }
        if (!CollectionUtils.isEmpty(request.getFilters())) {
            params.put("filters", request.getFilters());
        }

        String twigTemplate = "search_albums.twig";
        if (request.isEnableLtr()) {
            String model = "test_6";
            if (StringUtils.hasLength(request.getLtrModel())) {
                model = request.getLtrModel();
            }
            params.put("model", model);
            twigTemplate = "search_albums_ltr.twig";
        }

        SearchByTemplateRequest searchRequest = SearchByTemplateRequest.create()
                .setIndexName(INDEX)
                .setTemplateName(twigTemplate)
                .setAddId(false)
                .setModelParams(params)
                .setTypeReference(new AlbumEntityTypeReference());

        HitsAggsResponse<Album> searchResponse = searchService.aggsByTemplate(searchRequest);

        SearchResult result = new SearchResult();
        result.setFoundAlbums(searchResponse.getHits());
        result.setTotalNumberOfResults(searchResponse.getTotalHits());

        // Log the request/response
        searchStatsService.logSearchStats(request,
                searchResponse.getHits().stream().map(album -> String.valueOf(album.getId())).collect(Collectors.toList()),
                searchResponse.getTotalHits(),
                result.getQueryId()
        );


        TermsAggregation artistsAgg = (TermsAggregation) searchResponse.getAggregations().get("artistsAgg");
        List<KeyValuePair<Long>> artists = artistsAgg.getBuckets().stream()
                .map(termsBucket -> new KeyValuePair<>(termsBucket.getKey(), termsBucket.getDocCount()))
                .collect(Collectors.toList());
        result.setArtists(artists);

        TermsAggregation labelsAgg = (TermsAggregation) searchResponse.getAggregations().get("labelsAgg");
        List<KeyValuePair<Long>> labels = labelsAgg.getBuckets().stream()
                .map(termsBucket -> new KeyValuePair<>(termsBucket.getKey(), termsBucket.getDocCount()))
                .collect(Collectors.toList());
        result.setLabels(labels);

        return result;
    }

    public List<Album> findPaginatedAlbums(Long page, int size) {
        return doQueryAlbums("find_albums.twig", page, size);
    }

    public List<Album> findAllAlbums() {
        return doQueryAlbums("find_all_albums.twig", 1L, 501);
    }

    public Album findAlbumById(long id) {
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
                .setIndexName(INDEX)
                .setTemplateName(templateName)
                .setAddId(false)
                .setModelParams(params)
                .setTypeReference(new AlbumEntityTypeReference());

        HitsResponse<Album> objectHitsResponse = searchService.queryByTemplate(request);

        return objectHitsResponse.getHits();
    }

    public List<Album> findAlbumBySequenceId(List<Long> ids) {
        Map<String, Object> params = new HashMap<>();
        params.put("ids", ids);
        params.put("size", 5);

        SearchByTemplateRequest request = SearchByTemplateRequest.create()
                .setIndexName(INDEX)
                .setTemplateName("find_albums_by_sequence.twig")
                .setAddId(false)
                .setModelParams(params)
                .setTypeReference(new AlbumEntityTypeReference());

        HitsResponse<Album> objectHitsResponse = searchService.queryByTemplate(request);
        return objectHitsResponse.getHits();
    }

    public List<LtrModel> findLtrModels() {
        return Arrays.asList(
                new LtrModel("test_0", "MART"),
                new LtrModel("test_1", "RankNet"),
                new LtrModel("test_2", "RankBoost"),
                new LtrModel("test_3", "AdaRank"),
                new LtrModel("test_4", "Coordinate Ascent"),
                new LtrModel("test_5", "LambdaRank"),
                new LtrModel("test_6", "LambdaMART"),
                new LtrModel("test_7", "ListNet"),
                new LtrModel("test_8", "Random Forests"),
                new LtrModel("test_9", "Linear Regression")
        );
    }
}
