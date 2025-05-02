package tlcmarketplace.carrental.model;

import java.util.Date;


public class User {
    private String id;
    private String fullName;
    private String email;
    // private String role;
    private Date createdDatetime;

    public User() {}

    public User(String id, String email, String fullName, Date createdDatetime) {
        this.id = id;
        this.email = email;
        this.fullName = fullName;
        this.createdDatetime = createdDatetime;
    }

    public void setId(String id){
        this.id = id;
    }

    public String getId(){
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