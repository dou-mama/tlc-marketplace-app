package tlcmarketplace.carrental.dao;

import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import tlcmarketplace.carrental.model.User;

@Repository
public class UserDao {
    private static final Logger logger = LoggerFactory.getLogger(UserDao.class);
    private final JdbcTemplate jdbcTemplate;
    public UserDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<User> userRowMapper = (rs, rowNum) -> new User(
            rs.getObject("id", UUID.class),
            rs.getString("full_name"),
            rs.getString("email"),
            rs.getDate("created_at")
    );

    public int updateUser(User user){
        String sql = "UPDATE users SET full_name = ? WHERE email = ? ";
        int rows = jdbcTemplate.update(sql, user.getFullName(), user.getEmail());
        return rows;
    }



    // public int register(User user){
    //     try{
    //         String sql = "INSERT INTO users (first_name, last_name, email, role) VALUES (?,?,?,?)";
    //         jdbcTemplate.update(sql, user.getFirstName(), user.getLastName(), user.getEmail(), user.getRole());
    //     } catch(DataAccessException e){
    //         logger.error("Error occurred while registering new user: " + e.getMessage());
    //     }
    // }

    public User getUser(String email){
        String sql = "SELECT * FROM users WHERE email = ?";
        return jdbcTemplate.queryForObject(sql, userRowMapper, email);
    } 
}