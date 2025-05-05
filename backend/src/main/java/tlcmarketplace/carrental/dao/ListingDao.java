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
            rs.getDouble("price"),
            rs.getDate("created_at")
    );

    public Long createListing(Listing listing) {
        try {
            String sql = "INSERT INTO listings (owner_id, title, description, price, created_at) " +
                        "VALUES (?, ?, ?, ?, ?) RETURNING id";

            // jdbcTemplate.update(sql, UUID.fromString(listing.getOwnerId()), listing.getTitle(), listing.getDescription(), listing.getPrice(), Timestamp.from(Instant.now()));

            // sql = "SELECT id FROM listings WHERE owner_id=? AND title=? AND description=? AND price=? AND created_at=?";
            Long id = jdbcTemplate.queryForObject(
                sql,
                new Object[] {
                    listing.getOwnerId(),
                    listing.getTitle(),
                    listing.getDescription(),
                    listing.getPrice(),
                    Timestamp.from(Instant.now())
                },
                Long.class
            );


            // KeyHolder keyHolder = new GeneratedKeyHolder();

            // jdbcTemplate.update(connection -> {
            //     PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            //     ps.setObject(1, UUID.fromString(listing.getOwnerId()));  // owner_id
            //     ps.setString(2, listing.getTitle());                     // title
            //     ps.setString(3, listing.getDescription());               // description
            //     ps.setDouble(4, listing.getPrice());                 // price
            //     ps.setTimestamp(5, Timestamp.from(Instant.now()));       // created_at
            //     return ps;
            // }, keyHolder);
            // logger.info("Created listing with id: " + keyHolder.getKeys().get("id"));
            // UUID id = (UUID) keyHolder.getKeys().get("id");
            return id;  // or keyHolder.getKey() if returning only one column
        } catch (DataAccessException e) {
            logger.error("SQL Error creating listing", e);
            return null;
        }
    }

    public Listing getListingById(String id){
        try{
            String sql = "SELECT * FROM listings WHERE id=?";
            return jdbcTemplate.queryForObject(sql, listingRowMapper, Long.parseLong(id));
        }
        catch(DataAccessException e){
            logger.error("Error occurred while retrieving listing with id " + id + ": ", e);
            throw new DatabaseException("Error querying listing by id", e);
        }
        // return null;
    }

    public List<Listing> getListingsByOwner(String ownerId){
        try{
            //convert the ownerId to a UUID
            // UUID ownerId = UUID.fromString(ownerId);
            String sql = "SELECT * FROM listings WHERE owner_id=?";
            return jdbcTemplate.query(sql, listingRowMapper, UUID.fromString(ownerId));
        } catch(DataAccessException e){
            logger.error("Error occurred while retrieving listings with owner id: " + ownerId + ": ", e);
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