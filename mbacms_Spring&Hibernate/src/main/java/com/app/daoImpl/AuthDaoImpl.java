package com.app.daoImpl;


import com.app.dao.AuthDao;
import com.app.model.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Component;

@Component
public class AuthDaoImpl implements AuthDao {

        @PersistenceContext
        private EntityManager em;

    @Override
    public User login(String username, String password) {

        TypedQuery<User> q=em.createQuery("select u from User u where u.username=:user and u.password=:pass", User.class);

        q.setParameter("user",username)
                .setParameter("pass",password);

        return q.getSingleResult();
    }
}
