package com.example.carrot.user_location.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.example.carrot.global.common.BaseCreatedTimeEntity;
import com.example.carrot.location.entity.Location;
import com.example.carrot.user.entity.User;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserLocation extends BaseCreatedTimeEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long userLocationId;

	@Column(nullable = false)
	private boolean isMain;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "location_id")
	private Location location;

	@Builder
	public UserLocation(boolean isMain, User user, Location location) {
		this.isMain = isMain;
		this.user = user;
		this.location = location;
	}

	public static UserLocation of(User user, Location location, boolean isMain) {
		UserLocation userLocation = UserLocation.builder()
			.isMain(isMain)
			.location(location)
			.build();

		userLocation.addUser(user);
		return userLocation;
	}

	public void addUser(User user) {
		this.user = user;
		user.getUserLocations().add(this);
	}

	public UserLocation updateMainLocation(boolean isMain) {
		this.isMain = isMain;
		return this;
	}

	public boolean isSame(Location location) {
		return this.location == location;
	}

	public void changeMain(boolean isMain) {
		this.isMain = isMain;
	}

	public Long findLocationId() {
		return this.location.getLocationId();
	}
}
