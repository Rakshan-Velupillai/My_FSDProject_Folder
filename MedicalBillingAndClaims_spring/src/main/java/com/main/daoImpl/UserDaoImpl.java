package com.main.daoImpl;

import com.main.dao.UserDao;
import com.main.enums.Role;
import com.main.exceptions.ResourceNotFoundException;
import com.main.model.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserDaoImpl implements UserDao {

    private final JdbcTemplate jdbcTemplate;

    public UserDaoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public RowMapper<User> mapper(){
        return (rs,num)->{
          return new User(
                  rs.getInt("id"),
                  rs.getString("full_name"),
                  rs.getString("username"),
                  rs.getString("email"),
                  rs.getString("password"),
                  rs.getString("phone_number"),
                  Role.valueOf(rs.getString("role"))
          );
        };
    }


    @Override
    public void insert(User user) {

        String sql="insert into users (full_name, username, email, password, phone_number, role)" +
                "values(?,?,?,?,?,?)";
        jdbcTemplate.update(sql,
                user.getFullName(),
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                user.getPhoneNumber(),
                user.getRole().name());

    }

    @Override
    public List<User> getAll() {
        String sql="select * from users";
        return jdbcTemplate.query(sql,mapper());

    }

    @Override
    public User getById(int id) {
        String sql="select * from users where id=?";
        return jdbcTemplate.queryForObject(sql,mapper(),id);
    }

    @Override
    public void deleteById(int id) throws ResourceNotFoundException {

        String sql="delete from users where id=?";
        int rows=jdbcTemplate.update(sql,id);
        if(rows==0){
            throw new ResourceNotFoundException("Invalid id");
        }
    }

    @Override
    public void update(User user,int id) {
        String  sql= """
                        UPDATE users
                                    SET full_name = ?,
                                        username = ?,
                                        email = ?,
                                        password = ?,
                                        phone_number = ?,
                                        role = ?
                                    WHERE id = ?
                        """;

        jdbcTemplate.update(sql,
                user.getFullName(),
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                user.getPhoneNumber(),
                user.getRole().name(),
                id
        );
    }
}
