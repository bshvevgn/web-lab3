package db;

public class DAOFactory {
    private static CheckDAO resultDAO;

    private static DAOFactory instance;

    public static DAOFactory getInstance() {
        if (instance == null)
            instance = new DAOFactory();
        return instance;
    }
    
    public CheckDAO getResultDAO() {
        if (resultDAO == null)
            resultDAO = new CheckDAOImpl();
        return resultDAO;
    }
}