package com.example.carrot.user.dto.response;

import com.example.carrot.user_location.entity.UserLocation;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class UserLocationDeleteResponseDto {

	@JsonProperty("mainLocationId")
	private Long mainLocationId;

	public static UserLocationDeleteResponseDto of(UserLocation userLocation) {
		return new UserLocationDeleteResponseDto(userLocation.findLocationId());
	}

}
