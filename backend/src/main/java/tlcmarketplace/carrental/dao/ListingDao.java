package tlcmarketplace.carrental.dao;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import tlcmarketplace.carrental.exception.DatabaseException;
import tlcmarketplace.carrental.model.Listing;

@Repository
public class ListingDao{

    private static final Logger logger = LoggerFactory.getLogger(ListingDao.class);
    private final JdbcTemplate jdbcTemplate;

    public ListingDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Listing> listingRowMapper = (rs, rowNum) -> new Listing(
            rs.getLong("id"),
            rs.getObject("owner_id", UUID.class),
            rs.getString("title"),
            rs.getString("description"),
            rs.getString("type"),
            rs.getString("image_url"),
            rs.getDouble("price"),
            rs.getDate("created_at")
    );

    public Long createListing(Listing listing) {
        try {
            String sql = "INSERT INTO listings (owner_id, title, description, type, image_url, price, created_at) " +
                        "VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING id";

            // jdbcTemplate.update(sql, UUID.fromString(listing.getOwnerId()), listing.getTitle(), listing.getDescription(), listing.getPrice(), Timestamp.from(Instant.now()));

            // sql = "SELECT id FROM listings WHERE owner_id=? AND title=? AND description=? AND price=? AND created_at=?";
            Long id = jdbcTemplate.queryForObject(
                sql,
                new Object[] {
                    listing.getOwnerId(),
                    listing.getTitle(),
                    listing.getDescription(),
                    listing.getType(),
                    listing.getImageUrl(),
                    listing.getPrice(),
                    Timestamp.from(Instant.now())
                },
                Long.class
            );
            return id;  // or keyHolder.getKey() if returning only one column
        } catch (DataAccessException e) {
            logger.error("SQL Error creating listing", e);
            return null;
        }
    }

    public int updateListing(Listing listing){
        String sql = "UPDATE listings SET title = ?, description = ?, imageUrl = ?, price = ? WHERE id = ?";
        int rows = jdbcTemplate.update(sql, listing.getTitle(), listing.getDescription(), listing.getImageUrl(), listing.getPrice(), listing.getId());
        return rows;
    }

    public int deleteListing(String id){
        String sql = "DELETE FROM listings WHERE id = ?";
        int rows = jdbcTemplate.update(sql, Long.parseLong(id));
        return rows;
    }

    public Listing getListingById(String id){
        String sql = "SELECT * FROM listings WHERE id=?";
        return jdbcTemplate.queryForObject(sql, listingRowMapper, Long.parseLong(id));
        // catch(DataAccessException e){
        //     logger.error("Error occurred while retrieving listing with id " + id + ": ", e);
        //     throw new DatabaseException("Error querying listing by id", e);
        // }
    }

    public List<Listing> getListingsByOwner(String ownerId){
        String sql = "SELECT * FROM listings WHERE owner_id=?";
        return jdbcTemplate.query(sql, listingRowMapper, UUID.fromString(ownerId));
        // } catch(DataAccessException e){
        //     logger.error("Error occurred while retrieving listings with owner id: " + ownerId + ": ", e);
        //     throw new DatabaseException("Error querying listings by owner id", e);
        // }
    }

    public List<Listing> getAllListings(){
        String sql = "SELECT * FROM listings";
        return jdbcTemplate.query(sql, listingRowMapper);
        // } catch(DataAccessException e){
        //     logger.error("Error occurred while retrieving listings with id: " + e.getMessage());
        //     throw new DatabaseException("Error fetching all users", e);
        // return null;
    }

    
}