package tlcmarketplace.carrental.service;

import java.util.List;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import tlcmarketplace.carrental.controller.ListingController;
import tlcmarketplace.carrental.dao.ListingDao;
import tlcmarketplace.carrental.model.Listing;

@Service
public class ListingService {
    private final ListingDao listingDao;

    private static final Logger logger = LoggerFactory.getLogger(ListingService.class);

    public ListingService(ListingDao listingDao) {this.listingDao = listingDao;}

    public Listing createListing(Listing listing){
        Long id = listingDao.createListing(listing);
        logger.info("created listing with id: " + id);
        return listingDao.getListingById(id.toString());
    }
    public int updateListing(Listing listing) {return listingDao.updateListing(listing);}
    public Listing getListing(String id) {return listingDao.getListingById(id);}
    public int deleteListing(String id) {return listingDao.deleteListing(id);}
    public List<Listing> getListingsByOwner(String id) {return listingDao.getListingsByOwner(id);}
    public List<Listing> getAllListings() {return listingDao.getAllListings();}
}