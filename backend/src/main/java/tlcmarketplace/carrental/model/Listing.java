package tlcmarketplace.carrental.model;

import java.util.Date;

public class Listing{
    
    private String id;
    private String ownerId;
    private String title;
    private String description;
    private double price;
    private Date createdAt;

    public Listing(){}

    public Listing(String id, String ownerId, String title, String description, double price, Date createdAt){
        this.id = id;
        this.ownerId = ownerId;
        this.title = title;
        this.description = description;
        this.price = price;
        this.createdAt = createdAt;
    }

    public Listing(String ownerId, String title, String description, double price){
        this.ownerId = ownerId;
        this.title = title;
        this.description = description;
        this.price = price;
    }

    public String getId() {return this.id;}
    public void setId(String id) {this.id = id;}

    public String getOwnerId() {return this.ownerId;}
    public void setOwnerId(String ownerId) {this.ownerId = ownerId;}

    public String getTitle() {return this.title;}
    public void setTitle(String title) {this.title = title;}

    public String getDescription() {return this.description;}
    public void setDescription(String description) {this.description = description;}

    public double getPrice() {return this.price;}
    public void setPrice(double price) {this.price = price;}

    public Date getCreatedAt() {return this.createdAt;}
    public void setCreatedAt(Date createdAt) {this.createdAt = createdAt;}
}