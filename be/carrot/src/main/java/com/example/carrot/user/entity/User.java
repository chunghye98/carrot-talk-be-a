package com.example.carrot.user.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.example.carrot.global.common.BaseAllTimeEntity;
import com.example.carrot.global.exception.CustomException;
import com.example.carrot.global.exception.StatusCode;
import com.example.carrot.global.jwt.Jwt;
import com.example.carrot.like.entity.Like;
import com.example.carrot.location.entity.Location;
import com.example.carrot.product.entity.Product;
import com.example.carrot.user_location.entity.UserLocation;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "users")
public class User extends BaseAllTimeEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long userId;

	@Column(unique = true, nullable = false)
	private String nickName;

	@Column(length = 500)
	private String imageUrl;

	@Column(length = 500)
	private String refreshToken;

	@Column(nullable = false)
	private String socialId;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<UserLocation> userLocations = new ArrayList<>();

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<Like> likes = new ArrayList<>();

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<Product> products = new ArrayList<>();

	@Builder
	public User(String nickName, String imageUrl, String refreshToken, String socialId) {
		this.nickName = nickName;
		this.imageUrl = imageUrl;
		this.refreshToken = refreshToken;
		this.socialId = socialId;
	}

	public void updateRefreshToken(Jwt jwt) {
		this.refreshToken = jwt.getRefreshToken();
	}

	public UserLocation deleteUserLocation(Location location) {
		final int ONE = 1;

		UserLocation deletedUserLocation = userLocations.stream()
			.filter(userLocation -> userLocation.isSame(location))
			.findFirst()
			.orElseThrow(() -> new CustomException(StatusCode.NOT_FOUND_LOCATION));

		userLocations.remove(deletedUserLocation);

		if (userLocations.size() == ONE) {
			userLocations.get(0).changeMain(true);
		}

		return deletedUserLocation;
	}

	public UserLocation findMainLocation() {
		return userLocations.stream()
			.filter(UserLocation::isMain)
			.findFirst()
			.orElseThrow(() -> new CustomException(StatusCode.NOT_FOUND_MAIN_LOCATION));
	}
}
