package tlcmarketplace.carrental.controller;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tlcmarketplace.carrental.exception.GlobalExceptionHandler;
import tlcmarketplace.carrental.service.ListingService;
import org.springframework.jdbc.core.JdbcTemplate;
import java.util.Map;


@RestController
@RequestMapping("/api/v1")
public class GlobalController {
    // This class is intentionally left empty. 
    // It serves as a placeholder for global controller configurations or methods in the future.
    // Currently, all controller logic is handled in specific controllers.
    private final JdbcTemplate jdbcTemplate;

    public GlobalController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @GetMapping("/health")
    public ResponseEntity<?> testDb() {
        try {
            Integer result = jdbcTemplate.queryForObject("SELECT 1", Integer.class);
            return ResponseEntity.ok(Map.of("db", "connected", "result", result));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }




}
