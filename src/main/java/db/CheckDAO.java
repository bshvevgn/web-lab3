package db;

import model.CheckAreaBean;

import java.sql.SQLException;
import java.util.Collection;

public interface CheckDAO {
    void addNewResult(CheckAreaBean result) throws SQLException;
    void updateResult(Long bus_id, CheckAreaBean result) throws SQLException;
    CheckAreaBean getResultById(Long result_id) throws SQLException;
    Collection<CheckAreaBean> getResults() throws SQLException;
    void deleteResult(CheckAreaBean result) throws SQLException;
    void clearResults() throws SQLException;
}