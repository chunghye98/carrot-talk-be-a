package com.example.carrot.user_location.dto.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class ReadUserLocationResponseDto {

	public static final String DEFAULT_NAME = "역삼 1동";

	@JsonProperty("id")
	private Long id;
	@JsonProperty("name")
	private String name;
	@JsonProperty("isMainLocation")
	private boolean isMainLocation;

	public static ReadUserLocationResponseDto of(Long id, String name, boolean isMainLocation) {
		return new ReadUserLocationResponseDto(id, name, isMainLocation);
	}

	public static List<ReadUserLocationResponseDto> defaultLocation(Long id) {
		return List.of(new ReadUserLocationResponseDto(id, DEFAULT_NAME, true));
	}
}
