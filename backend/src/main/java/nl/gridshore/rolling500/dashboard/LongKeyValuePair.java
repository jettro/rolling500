package nl.gridshore.rolling500.dashboard;

/**
 * Created by jettrocoenradie on 19/03/2017.
 */
public class LongKeyValuePair extends KeyValuePair<Long> {
    public LongKeyValuePair(String key, Long value) {
        super(key, value);
    }

    public void increase() {
        setValue(getValue()+1);
    }
}
