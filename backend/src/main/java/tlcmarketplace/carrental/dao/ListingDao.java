package tlcmarketplace.carrental.dao;

import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import tlcmarketplace.carrental.exception.DatabaseException;
import tlcmarketplace.carrental.model.Listing;

@Repository
public class ListingDao{

    private static final Logger logger = LoggerFactory.getLogger(UserDao.class);
    private final JdbcTemplate jdbcTemplate;

    public ListingDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Listing> listingRowMapper = (rs, rowNum) -> new Listing(
            rs.getString("id"),
            rs.getString("owner_id"),
            rs.getString("title"),
            rs.getString("description"),
            rs.getDouble("price"),
            rs.getDate("created_at")
    );

    public int createListing(Listing listing){
        try{
            String sql = "INSERT INTO listings(owner_id, title, description, price, created_at) values(?,?,?,?,?)";
            return jdbcTemplate.update(sql, listing.getOwnerId(), listing.getTitle(), listing.getDescription(), listing.getPrice(), new Date());
        } catch(DataAccessException e){
            logger.error("Error occurred while creating new listing: " + e.getMessage());
        }
        return 0;
    }

    public Listing getListingById(String id){
        try{
            String sql = "SELECT * FROM listings WHERE id=?";
            return jdbcTemplate.queryForObject(sql, listingRowMapper, id);
        }
        catch(DataAccessException e){
            logger.error("Error occurred while retrieving listing with id " + id + ": " + e.getMessage());
            throw new DatabaseException("Error querying listing by id", e);
        }
        // return null;
    }

    public List<Listing> getListingsByOwner(String ownerId){
        try{
            String sql = "SELECT * FROM listings WHERE id=?";
            return jdbcTemplate.query(sql, listingRowMapper, ownerId);
        } catch(DataAccessException e){
            logger.error("Error occurred while retrieving listings with owner id: " + ownerId + ": " + e.getMessage());
            throw new DatabaseException("Error querying listings by owner id", e);
        }
    }

    public List<Listing> getAllListings(){
        try{
            String sql = "SELECT * FROM listings";
            return jdbcTemplate.query(sql, listingRowMapper);
        } catch(DataAccessException e){
            logger.error("Error occurred while retrieving listings with id: " + e.getMessage());
            throw new DatabaseException("Error fetching all users", e);
        }
        // return null;
    }

    
}