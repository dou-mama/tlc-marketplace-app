package tlcmarketplace.carrental.dao;

import java.util.Date;
import org.springframework.dao.DataAccessException;
// import org.springframework.jdbc.JdbcTemplate;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.RowMapperResultSetExtractor;
import org.springframework.stereotype.Repository;
import tlcmarketplace.carrental.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.Optional;
import java.util.List;

@Repository
public class UserDao {
    private static final Logger logger = LoggerFactory.getLogger(UserDao.class);
    private final JdbcTemplate jdbcTemplate;
    public UserDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<User> userRowMapper = (rs, rowNum) -> new User(
            rs.getString("id"),
            rs.getString("full_name"),
            rs.getString("email"),
            rs.getDate("created_at")
    );

    // public int register(User user){
    //     try{
    //         String sql = "INSERT INTO users (first_name, last_name, email, role) VALUES (?,?,?,?)";
    //         jdbcTemplate.update(sql, user.getFirstName(), user.getLastName(), user.getEmail(), user.getRole());
    //     } catch(DataAccessException e){
    //         logger.error("Error occurred while registering new user: " + e.getMessage());
    //     }
    // }

    public Optional<User> getUserByEmail(String email){
        try{
            String sql = "SELECT * FROM users WHERE email = ?";
            return jdbcTemplate.query(sql, userRowMapper, email).stream().findFirst();
        } catch(DataAccessException e){
            logger.error("Error occurred while retrieving user with email " + email + ": " + e.getMessage());
            return null;
        }
    }
}