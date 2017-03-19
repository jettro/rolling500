package nl.gridshore.rolling500.recommender;

import java.io.Serializable;

public class Point implements Serializable {

    private long id;
    private double[] coord;

    public Point(long id, double[] coord) {
        this.id = id;
        this.coord = coord;
    }

    public long getId() {
        return id;
    }

    public double[] getCoord() {
        return coord;
    }
}
