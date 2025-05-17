package tlcmarketplace.carrental.service;

import java.util.List;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import tlcmarketplace.carrental.controller.ListingController;
import tlcmarketplace.carrental.dao.ListingDao;
import tlcmarketplace.carrental.dao.CarListingDao;
import tlcmarketplace.carrental.model.Listing;
import tlcmarketplace.carrental.model.CarListing;
import tlcmarketplace.carrental.service.CarListingService;


@Service
public class CarListingService {

    private final CarListingDao carListingDao;
    private final ListingService listingService;

    public CarListingService(CarListingDao carListingDao, ListingService listingService) {
        this.carListingDao = carListingDao;
        this.listingService = listingService;
    }

    public CarListing createListing(CarListing carListing){
        //create the listing first
        Listing listing = new Listing(carListing.getOwnerId(), carListing.getTitle(), carListing.getDescription(), carListing.getType(), carListing.getImageUrl(), carListing.getPrice());
        Long listingId = listingService.createListing(listing);
 
        //create car listing
        carListing.setListingId(listingId);
        carListingDao.createCarListing(carListing);
        return carListingDao.getCarListingByListingId(listingId);
    }

    public List<CarListing> getAllCarListings() { return carListingDao.getAllCarListings();}
    public CarListing getCarListingById(String id) {return carListingDao.getCarListingById(id);}
    
    
}
