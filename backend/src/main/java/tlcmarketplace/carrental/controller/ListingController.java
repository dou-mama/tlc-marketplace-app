package tlcmarketplace.carrental.controller;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;  
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import tlcmarketplace.carrental.exception.DatabaseException;
import tlcmarketplace.carrental.model.Listing;
import tlcmarketplace.carrental.model.CarListing;
import tlcmarketplace.carrental.service.ListingService;
import tlcmarketplace.carrental.service.CarListingService;

@RestController
@RequestMapping("api/v1/listings")
public class ListingController{
    private final ListingService listingService;
    private final CarListingService carListingService;
    private static final Logger logger = LoggerFactory.getLogger(ListingController.class);

    public ListingController(ListingService listingService, CarListingService carListingService){
        this.listingService = listingService;
        this.carListingService = carListingService;
    }

    @PostMapping("/cars")
    public ResponseEntity<?> createCarListing(@RequestBody CarListing carListing){
        logger.info("creating car listing" + carListing);
        //check if the listing was created successfully
        if(carListing == null) return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "could not create the listing"));
        else return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("listing", carListingService.createListing(carListing)));
    } 

    // @PostMapping("")
    // public ResponseEntity<?> createListing(@RequestBody Listing listing){
    //     logger.info("creating listing" + listing);

    //     Listing newListing = listingService.createListing(listing);
    //     //check if the listing was created successfully
    //     if(newListing == null) return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "could not create the listing"));
    //     else return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("listing", newListing));
    // } 

    @GetMapping("/owner")
    public ResponseEntity<?> getListingsByOwnerId(@RequestParam("ownerId") String ownerId){
        List<Listing> listings = listingService.getListingsByOwner(ownerId);
        if(listings.isEmpty()) return ResponseEntity.noContent().build();
        else return ResponseEntity.ok(listings);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getListingById(@PathVariable("id") String id){
        logger.info("getting listing with id: " + id);
        Listing listing = listingService.getListing(id);
        return ResponseEntity.ok(listing);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateListing(@PathVariable("id") String id, @RequestBody Listing listing){
        logger.info("updating listing with id: " + id);
        int rows = listingService.updateListing(listing);
        if(rows == 0) return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "no listing found with that id"));
        return ResponseEntity.ok(Map.of("message", "listing updated"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteListing(@PathVariable("id") String id){
        logger.info("deleting listing with id: " + id);
        int rows = listingService.deleteListing(id);
        if(rows == 0) return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "no listing found with that id"));
        return ResponseEntity.ok(Map.of("message", "listing deleted")); 
    }


    @GetMapping("")
    public ResponseEntity<?> getAllListings(){
        logger.info("getting all listings");
        List<Listing> listings = listingService.getAllListings();
        if(listings.isEmpty()) return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "no listings were returned"));
        return ResponseEntity.ok(listingService.getAllListings());
    }
}