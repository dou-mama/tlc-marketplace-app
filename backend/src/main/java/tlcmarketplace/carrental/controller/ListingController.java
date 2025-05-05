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

    @PostMapping("")
    public ResponseEntity<?> createListing(@RequestBody Listing listing){
        logger.info("creating listing" + listing);

        Listing newListing = listingService.createListing(listing);
        //check if the listing was created successfully
        if(newListing == null) return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "could not create the listing"));
        else return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("listing", newListing));
    } 

    @GetMapping("/owner")
    public ResponseEntity<?> getListingsByOwnerId(@RequestParam("ownerId") String ownerId){
        List<Listing> listings = listingService.getListingsByOwner(ownerId);
        if(listings.isEmpty()) return ResponseEntity.noContent().build();
        else return ResponseEntity.ok(listings);
    }

    @GetMapping("/listing")
    public ResponseEntity<?> getListingById(@RequestParam("id") String id){
        logger.info("getting listing with id: " + id);
        Listing listing = listingService.getListing(id);
        return ResponseEntity.ok(listing);
    }


    @GetMapping("")
    public ResponseEntity<?> getAllListings(){
        logger.info("getting all listings");
        List<Listing> listings = listingService.getAllListings();
        if(listings.isEmpty()) return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "no listings were returned"));
        return ResponseEntity.ok(listingService.getAllListings());
    }
}