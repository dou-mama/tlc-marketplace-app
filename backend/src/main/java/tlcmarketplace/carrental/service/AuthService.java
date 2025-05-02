// package tlcmarketplace.carrental.service;

// import tlcmarketplace.carrental.model.User;
// import tlcmarketplace.carrental.dao.UserDao;
// import tlcmarketplace.carrental.auth.JwtFilter;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.stereotype.Service;
// import java.util.Optional;

// @Service
// public class AuthService {
//     private final UserDao userDao;
//     private final JwtFilter jwtFilter;
//     private final PasswordEncoder passwordEncoder;

//     public AuthService(UserDao userDao, JwtFilter jwtFilter, PasswordEncoder passwordEncoder){
//         this.userDao = userDao;
//         this.jwtFilter = jwtFilter;
//         this.passwordEncoder = passwordEncoder;
//     }

//     public String register(String email, String password, String firstName, String lastName){
//         //check if user already exists
//         if(userDao.getUserByEmail(email).isPresent()){
//             throw new RuntimeException("User already exists");
//         }

//         //create the user object and add it to the database
//         User user = new User();
//         user.setEmail(email);
//         user.setPassword(passwordEncoder.encode(password));
//         user.setFirstName(firstName);
//         user.setLastName(lastName);
//         user.setRole("USER");
//         userDao.register(user);

//         //return token to jwt token to user
//         return jwtUtil.generateToken(email);
//     }

//     public String login(String email, String password){
//         //get the user
//         Optional<User> user = userDao.getUserByEmail(email);
//         //check if user exists and if credentials match
//         if(user.isPresent()){
//             if(passwordEncoder.matches(password, user.get().getPassword())){
//                 //if password matches, return a jwt token
//                 return jwtUtil.generateToken(email);
//             }
//             throw new RuntimeException("Invalid password.");
//         }
//         throw new RuntimeException("Invalid email.");
//     }
// }