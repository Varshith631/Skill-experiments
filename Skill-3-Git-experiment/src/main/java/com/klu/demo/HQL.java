package com.klu.demo;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import com.klu.util.HibernateUtil;
import com.klu.loader.ProductDataLoader;

public class HQL {

    public static void main(String[] args) {

        SessionFactory factory = HibernateUtil.getSessionFactory();
        Session session = factory.openSession();

        ProductDataLoader.loadData(session);

        session.close();
        factory.close();
    }
}