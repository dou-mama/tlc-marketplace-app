// import tlcmarketplace.carrental.service.AuthService;
// import org.springframework.web.bind.annotation.*;
// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.beans.factory.annotation.Autowired;

// @RestController
// @RequestMapping("/auth")
// public class AuthController {
//     private final AuthService authService;
//     private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

//     @Autowired
//     public AuthController(AuthService authService){
//         this.authService = authService;
//     }

//     @PostMapping("/register")
//     public String register(@RequestParam String email, @RequestParam String password, 
//     @RequestParam String firstName, @RequestParam String lastName){
//         try{
//             logger.info("Registering user: " + email);
//             return authService.register(email, password, firstName, lastName);
//         } catch(RuntimeException e){
//             logger.error("Encountered error while registering user " + email + ": " + e.getMessage());
//         }
//     }

//     @PostMapping("/login")
//     public String login(@RequestParam String email, @RequestParam String password){
//         try {
//             logger.info("Logging in user: " + email);
//             return authService.login(email, password);
//         } catch(RuntimeException e){
//             logger.error("Encountered error while loggin in user " + email + ": " + e.getMessage());
//         }
//     }
// }