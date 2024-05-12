package model;

import db.DAOFactory;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.faces.context.ExternalContext;
import jakarta.faces.context.FacesContext;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import jakarta.servlet.http.HttpServletRequest;
import org.primefaces.PrimeFaces;

import java.io.IOException;
import java.io.Serializable;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.Objects;

@Named
@ApplicationScoped
public class CheckAreaResultsBean implements Serializable {
    @Inject
    private XBean XBean;
    @Inject
    private YBean YBean;
    @Inject
    private RBean RBean;

    private LinkedList<CheckAreaBean> results;

    public CheckAreaResultsBean() {
        super();
        results = new LinkedList<>(DAOFactory.getInstance().getResultDAO().getResults());
    }

    @Named(value = "resultList")
    public LinkedList<CheckAreaBean> getResults() {
        return results;
    }

    public void setResults(LinkedList<CheckAreaBean> results) {
        this.results = results;
    }

    public void newResult(final double x, final double y, final double r) {
        System.out.println("Send: " + x + " " + y + " " + r);
        final CheckAreaBean currentResult = new CheckAreaBean();

        final long startExec = System.nanoTime();
        final boolean result = AreaResultChecker.getResult(x, y, r);
        final long endExec = System.nanoTime();
        final long executionTime = endExec - startExec;

        currentResult.setX(x);
        currentResult.setY(y);
        currentResult.setR(r);
        currentResult.setResult(result);
        currentResult.setExecutedAt(LocalDateTime.now());
        currentResult.setExecTime(executionTime);

            DAOFactory.getInstance().getResultDAO().addNewResult(currentResult);

        results.addFirst(currentResult);
    }

    public void addPoint(double x, double y, double r, boolean hit) {
        System.out.println("TEST: " + x + ", " + y + ", " + r + ", " + hit);
        PrimeFaces.current().executeScript("addPoint(" + x + ", " + y + ", " + r + ", " + hit + ")");
    }

    public void clearResults() {
        results.clear();
        try {
            DAOFactory.getInstance().getResultDAO().clearResults();
            ExternalContext ec = FacesContext.getCurrentInstance().getExternalContext();
            ec.redirect(((HttpServletRequest) ec.getRequest()).getRequestURI());
        } catch (IOException ignored) {}
    }

    @Override
    public String toString() {
        return "CheckAreaResultsBean{" +
                "XBean=" + XBean +
                ", YBean=" + YBean +
                ", RBean=" + RBean +
                ", results=" + results +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CheckAreaResultsBean that = (CheckAreaResultsBean) o;
        return Objects.equals(XBean, that.XBean) && Objects.equals(YBean, that.YBean) && Objects.equals(RBean, that.RBean) && Objects.equals(results, that.results);
    }

    @Override
    public int hashCode() {
        return Objects.hash(XBean, YBean, RBean, results);
    }
}