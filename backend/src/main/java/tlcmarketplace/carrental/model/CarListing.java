package tlcmarketplace.carrental.model;

import java.util.Date;
import java.util.UUID;
import tlcmarketplace.carrental.model.Listing;

public class CarListing extends Listing {
    private Long id;
    private String make;
    private String model;
    private int year;
    private int mileage;
    private Long listingId;
    private Date createdAt;


    public CarListing() {}

    public CarListing(Long id, Long listingId, UUID ownerId, String title, String description, String type, String imageUrl, double price, Date createdAt, String make, String model, int year, int mileage) {
        super(id, ownerId, title, description, type, imageUrl, price, createdAt);
        this.make = make;
        this.model = model;
        this.year = year;
        this.mileage = mileage;
        this.listingId = listingId;
    }

    public CarListing(Long listingId, UUID ownerId, String title, String description, String type, String imageUrl, double price, String make, String model, int year, int mileage) {
        super(ownerId, title, description, type, imageUrl, price);
        this.make = make;
        this.model = model;
        this.year = year;
        this.mileage = mileage;
        this.listingId = listingId;
    }

    public String getMake() {
        return make;
    }
    public void setMake(String make) {
        this.make = make;
    }
    public String getModel() {
        return model;
    }
    public void setModel(String model) {
        this.model = model;
    }
    public int getYear() {
        return year;
    }
    public void setYear(int year) {
        this.year = year;
    }
    public int getMileage() {
        return mileage;
    }
    public void setMileage(int mileage) {
        this.mileage = mileage;
    }
    public Long getListingId() {
        return listingId;
    }
    public void setListingId(Long listingId) {
        this.listingId = listingId;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Date getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
    @Override
    public String toString() {
        return "CarListing{" +
                "make='" + make + '\'' +
                ", model='" + model + '\'' +
                ", year=" + year +
                ", mileage=" + mileage +
                ", listingId=" + listingId +
                ", createdAt=" + createdAt +
                "} " + super.toString();
    }
    

    
}
