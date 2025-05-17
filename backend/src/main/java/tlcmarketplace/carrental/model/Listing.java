package tlcmarketplace.carrental.model;

import java.util.Date;
import java.util.UUID;

public class Listing{
    
    private Long id;
    private UUID ownerId;
    private String title;
    private String description;
    private String imageUrl;
    private String type;
    private double price;
    private Date createdAt;

    public Listing(){}

    public Listing(Long id, UUID ownerId, String title, String description, String type, String imageUrl, double price, Date createdAt){
        this.id = id;
        this.ownerId = ownerId;
        this.title = title;
        this.description = description;
        this.type = type;
        this.imageUrl = imageUrl;
        this.price = price;
        this.createdAt = createdAt;
    }

    public Listing(UUID ownerId, String title, String description, String type, String imageUrl, double price){
        this.ownerId = ownerId;
        this.title = title;
        this.description = description;
        this.type = type;
        this.imageUrl = imageUrl;
        this.price = price;
    }

    public Long getId() {return this.id;}
    public void setId(Long id) {this.id = id;}

    public UUID getOwnerId() {return this.ownerId;}
    public void setOwnerId(UUID ownerId) {this.ownerId = ownerId;}

    public String getTitle() {return this.title;}
    public void setTitle(String title) {this.title = title;}

    public String getDescription() {return this.description;}
    public void setDescription(String description) {this.description = description;}

    public String getType() {return this.type;}
    public void setType(String type) {this.type = type;}

    public String getImageUrl() {return this.imageUrl;}
    public void setImageUrl(String imageUrl) {this.imageUrl = imageUrl;}

    public double getPrice() {return this.price;}
    public void setPrice(double price) {this.price = price;}

    public Date getCreatedAt() {return this.createdAt;}
    public void setCreatedAt(Date createdAt) {this.createdAt = createdAt;}

    public String toString(){
        return "Listing{" +
                "id='" + getId() + '\'' +
                ", ownerId='" + getOwnerId() + '\'' +
                ", title='" + getTitle() + '\'' +
                ", description='" + getDescription() + '\'' +
                ", type='" + getType() + '\'' +
                ", imageUrl='" + getImageUrl() + '\'' +
                ", price=" + getPrice() +
                ", createdAt=" + getCreatedAt() +
                '}';
    }
}