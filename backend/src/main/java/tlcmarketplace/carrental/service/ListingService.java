package tlcmarketplace.carrental.service;

import java.util.List;

import org.springframework.stereotype.Service;

import tlcmarketplace.carrental.dao.ListingDao;
import tlcmarketplace.carrental.model.Listing;

@Service
public class ListingService {
    private final ListingDao listingDao;

    public ListingService(ListingDao listingDao) {this.listingDao = listingDao;}

    public int createListing(Listing listing){
        return listingDao.createListing(listing);
    }
    public Listing getListing(String id) {return listingDao.getListingById(id);}
    public List<Listing> getListingsByOwner(String id) {return listingDao.getListingsByOwner(id);}
    public List<Listing> getAllListings() {return listingDao.getAllListings();}
}