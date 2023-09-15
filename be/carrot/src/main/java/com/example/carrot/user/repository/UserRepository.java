package com.example.carrot.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.carrot.user.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findBySocialId(String socialId);

	boolean existsByNickName(String nickName);

	Optional<User> findByRefreshToken(String refreshToken);

	@Modifying
	@Query("UPDATE User u SET u.refreshToken = null WHERE u.userId = :userId AND u.refreshToken = :refreshToken")
	int updateRefreshTokenByUserIdAndRefreshToken(@Param("userId") Long userId,
		@Param("refreshToken") String refreshToken);

}
