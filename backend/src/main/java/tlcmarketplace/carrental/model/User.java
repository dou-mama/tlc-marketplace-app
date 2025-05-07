package tlcmarketplace.carrental.model;

import java.util.Date;
import java.util.UUID;


public class User {
    private UUID id;
    private String fullName;
    private String email;
    // private String role;
    private Date createdDatetime;

    public User() {}

    public User(UUID id, String email, String fullName, Date createdDatetime) {
        this.id = id;
        this.email = email;
        this.fullName = fullName;
        this.createdDatetime = createdDatetime;
    }

    public void setId(UUID id){
        this.id = id;
    }

    public UUID getId(){
        return this.id;
    }

    public String getFullName(){
        return this.fullName;
    }
    public void setFullName(String fullName){
        this.fullName = fullName;
    }

    public void setCreatedDatetime(Date createdDatetime){
        this.createdDatetime = createdDatetime;
    }
    public Date getCreatedDatetime(){
        return this.createdDatetime;
    }

    public String getEmail() {return email;}
    public void setEmail(String email) { this.email = email; }

    // public String getRole() { return role; }
    // public void setRole(String role) { this.role = role; }
}