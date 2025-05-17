package tlcmarketplace.carrental.dao;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import java.util.List;
import java.util.UUID;
import java.sql.Timestamp;
import java.time.Instant;

import tlcmarketplace.carrental.model.CarListing;
import org.springframework.stereotype.Repository;
import java.sql.Timestamp;

@Repository
public class CarListingDao {
    private static final Logger logger = LoggerFactory.getLogger(CarListingDao.class);
    private final JdbcTemplate jdbcTemplate;

    public CarListingDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<CarListing> carListingRowMapper = (rs, rowNum) -> {
        CarListing carListing = new CarListing();

        carListing.setId(rs.getLong("id"));
        carListing.setOwnerId(rs.getObject("owner_id", UUID.class));
        carListing.setTitle(rs.getString("title"));
        carListing.setDescription(rs.getString("description"));
        carListing.setType(rs.getString("type"));
        carListing.setImageUrl(rs.getString("image_url"));
        carListing.setPrice(rs.getDouble("price"));
        carListing.setCreatedAt(rs.getDate("created_at"));
        carListing.setMake(rs.getString("make"));
        carListing.setModel(rs.getString("model"));
        carListing.setYear(rs.getInt("year"));
        carListing.setMileage(rs.getInt("mileage"));
        carListing.setListingId(rs.getLong("listing_id"));
        return carListing;
    }; 

    public int createCarListing(CarListing car){
        String sql = "INSERT INTO cars (make, model, year, mileage, listing_id, created_at) " +
        "VALUES (?, ?, ?, ?, ?, ?)";

        return jdbcTemplate.update(sql, car.getMake(), car.getModel(), car.getYear(), car.getMileage(), car.getListingId(), Timestamp.from(Instant.now()));
        

    }

    public CarListing getCarListingById(String id){
        String sql = "SELECT l.description, l.price, l.owner_id, l.type, l.title, l.image_url, l.created_at, c.make, c.model, c.year, c.mileage, c.id, c.listing_id FROM listings l JOIN cars c on l.id = c.listing_id WHERE l.id = ? AND l.type = 'car'";
        return jdbcTemplate.queryForObject(sql, carListingRowMapper, Long.parseLong(id));
    }

    public CarListing getCarListingByListingId(Long id){
        String sql = "SELECT l.description, l.price, l.owner_id, l.type, l.title, l.image_url, l.created_at, c.make, c.model, c.year, c.mileage, c.id, c.listing_id FROM listings l JOIN cars c on l.id = c.listing_id WHERE c.listing_id = ? AND l.type = 'car'";
        return jdbcTemplate.queryForObject(sql, carListingRowMapper, id);
    }

    public List<CarListing> getAllCarListings(){
        /*SELECT l.id, l.type, l.description, l.price, l.owner_id,
       c.make, c.model, c.year
       FROM listings l
       JOIN cars c ON l.id = c.listing_id
       WHERE l.id = ? AND l.type = 'car';*/
        String sql = "SELECT l.description, l.price, l.owner_id, l.type, l.title, l.image_url, l.created_at, c.make, c.model, c.year, c.mileage, c.id, c.listing_id FROM listings l JOIN cars c on l.id = c.listing_id";
        return jdbcTemplate.query(sql, carListingRowMapper);
    }



}
