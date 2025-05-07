package tlcmarketplace.carrental.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import tlcmarketplace.carrental.dao.UserDao;
import tlcmarketplace.carrental.model.User;

@Service
public class UserService {
    private final UserDao userDao;

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    public UserService(UserDao userDao) {this.userDao = userDao;}

    public int updateUser(User user) {return userDao.updateUser(user);}
    public User getUser(String email) {return userDao.getUser(email);}
}
