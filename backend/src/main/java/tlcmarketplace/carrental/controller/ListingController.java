package tlcmarketplace.carrental.controller;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;  
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import tlcmarketplace.carrental.exception.DatabaseException;
import tlcmarketplace.carrental.model.Listing;
import tlcmarketplace.carrental.service.ListingService;

@RestController
@RequestMapping("api/v1/listings")
public class ListingController{
    private final ListingService listingService;
    private static final Logger logger = LoggerFactory.getLogger(ListingController.class);

    public ListingController(ListingService listingService){this.listingService = listingService;}

    @PostMapping("/")
    public ResponseEntity<?> createListing(@RequestBody Listing listing){
        try{
            int updatedRows = listingService.createListing(listing);
            if(updatedRows > 0) return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", "car created successfully"));
            // if(updatedRows > 0) return new ResponseEntity("Successfully created the listing: " + listing.getTitle(), HttpStatus.CREATED);
            else return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "could not create the listing"));
        } catch(DatabaseException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "could not create the listing: " + e.getMessage()));
        }
    } 

    @GetMapping("/owner")
    public ResponseEntity<?> getListingsByOwnerId(@RequestParam String ownerId){
        try {
            List<Listing> listings = listingService.getListingsByOwner(ownerId);
            if(listings.isEmpty()) return ResponseEntity.noContent().build();
            else return ResponseEntity.ok(listings);
        } catch (DatabaseException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "not found"));
        }
    }

    @GetMapping("/listing")
    public ResponseEntity<?> getListingById(@RequestParam String id){
        try {
            Listing listing = listingService.getListing(id);
            return ResponseEntity.ok(listing);
        } 
        catch (DatabaseException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "resource not found"));
        } 
    }


    @GetMapping("/")
    public ResponseEntity<?> getAllListings(){
        try{
            List<Listing> listings = listingService.getAllListings();
            if(!listings.isEmpty()) return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "no listings were returned"));
            return ResponseEntity.ok(listingService.getAllListings());
        } catch(DatabaseException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "error processing request: " + e.getMessage()));
        }
    }
}