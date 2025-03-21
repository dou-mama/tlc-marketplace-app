import java.util.date;


public class User {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String role;
    private Date createdDatetime;

    public User() {}

    public User(Long id, String email, String firstName, String lastName, String password, String role) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.role = role;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public void setId(Long id){
        this.id = id;
    }

    public Long getId(){
        return this.id;
    }

    public String getFirstName(){
        return this.firstName;
    }

    public void setFirstName(String firstName){
        this.firstName = firstName;
    }

    public String getLastName(){
        return this.lastName;
    }

    public void setlastName(String lastName){
        this.lastName = lastName;
    } 

    public void setCreatedDatetime(Date createdDatetime){
        this.createdDatetime = createdDatetime;
    }

    public Date getCreatedDatetime(){
        return this.createdDatetime;
    }

    public void setPassword(String password){
        this.password = password;
    }

    public String getPassword(){
        return this.password;
    }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}