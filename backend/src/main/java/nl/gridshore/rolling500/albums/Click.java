package nl.gridshore.rolling500.albums;

public class Click {

    private String term;
    private Long clicks;

    public String getTerm() {
        return term;
    }

    public Click setTerm(String term) {
        this.term = term;
        return this;
    }

    public Long getClicks() {
        return clicks;
    }

    public Click setClicks(Long clicks) {
        this.clicks = clicks;
        return this;
    }
}
