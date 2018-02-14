package nl.gridshore.rolling500.evidence;

import eu.luminis.elastic.document.DocumentService;
import eu.luminis.elastic.document.IndexRequest;
import eu.luminis.elastic.document.SingleClusterDocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/evidence")
public class EvidenceController {
    private static final String INDEX = "evidences";
    private static final String TYPE = "evidence";
    private final SingleClusterDocumentService documentService;

    @Autowired
    public EvidenceController(SingleClusterDocumentService documentService) {
        this.documentService = documentService;
    }


    @PostMapping
    public void storeEvidence(@RequestBody Evidence evidence) {
        IndexRequest indexRequest = new IndexRequest(INDEX,TYPE);
        indexRequest.setEntity(evidence);

        documentService.index(indexRequest);
    }

    @PostMapping("/emotion")
    public void storeEmotionEvidence(@RequestBody EmotionEvidence evidence) {
        IndexRequest indexRequest = new IndexRequest(INDEX,TYPE);
        indexRequest.setEntity(evidence);

        documentService.index(indexRequest);
    }
}
