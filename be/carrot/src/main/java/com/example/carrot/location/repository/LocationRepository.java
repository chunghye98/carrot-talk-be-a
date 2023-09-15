package com.example.carrot.location.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.carrot.location.entity.Location;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {

	@Query("SELECT l FROM Location l WHERE l.name LIKE %:keyword%")
	List<Location> findLocationsByKeyword(@Param("keyword") String keyword);

	Optional<Location> findLocationByName(String name);
}
