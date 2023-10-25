package db;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class HibernateUtils {

    private static final SessionFactory sessionFactory = buildSessionFactory();

    private static SessionFactory buildSessionFactory() {
        try {
            Configuration configuration = new Configuration().configure("hibernate.cfg.xml");

            return configuration.buildSessionFactory();
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("SessionFactory error: " + e.getMessage());
        }
    }

    public static SessionFactory getFactory() {
        return sessionFactory;
    }

    public static void shutdown() {
        getFactory().close();
    }
}
