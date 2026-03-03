package com.inventory.util;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
public class Hibernateutil {
   private static SessionFactory factory;
 static {
        factory = new Configuration().configure().buildSessionFactory();
    }
public static SessionFactory getSessionFactory() {
        return factory;
    } }
