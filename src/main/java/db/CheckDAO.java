package db;

import model.CheckAreaBean;
import java.util.Collection;

public interface CheckDAO {
    void addNewResult(CheckAreaBean result);
    void updateResult(Long bus_id, CheckAreaBean result);
    CheckAreaBean getResultById(Long result_id);
    Collection<CheckAreaBean> getResults();
    void deleteResult(CheckAreaBean result);
    void clearResults();
}
