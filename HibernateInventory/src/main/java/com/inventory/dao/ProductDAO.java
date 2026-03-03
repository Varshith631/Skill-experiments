package com.inventory.dao;
import org.hibernate.Session;
import org.hibernate.Transaction;
import com.inventory.entity.Product;
import org.hibernate.Transaction;
import com.inventory.entity.Product;
public class ProductDAO {
    public void saveProduct(Product product) {
        Session session = Hibernateutil.getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();
        session.save(product);
        tx.commit();
        session.close();
    }
    public Product getProduct(int id) {
        Session session = Hibernateutil.getSessionFactory().openSession();
        Product product = session.get(Product.class, id);
        session.close();
        return product;
    }
    public void updateProduct(int id, double price, int quantity) {
        Session session = Hibernateutil.getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();
        Product product = session.get(Product.class, id);
        product.setPrice(price);
        product.setQuantity(quantity);
        session.update(product);
        tx.commit();
        session.close();
    }
    public void deleteProduct(int id) {
        Session session = Hibernateutil.getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();
 Product product = session.get(Product.class, id);
        session.delete(product);
        tx.commit();
        session.close();
    }
}
