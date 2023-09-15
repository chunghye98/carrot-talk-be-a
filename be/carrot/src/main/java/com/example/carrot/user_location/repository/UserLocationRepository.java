package com.example.carrot.user_location.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.carrot.user.entity.User;
import com.example.carrot.user_location.entity.UserLocation;

@Repository
public interface UserLocationRepository extends JpaRepository<UserLocation, Long> {

	@Query("SELECT ul FROM UserLocation ul WHERE ul.user = :user")
	List<UserLocation> findAllByUser(@Param("user") User user);

}
