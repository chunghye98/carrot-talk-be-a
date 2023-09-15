package com.example.carrot.location.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.carrot.global.exception.CustomException;
import com.example.carrot.global.exception.StatusCode;
import com.example.carrot.location.dto.response.LocationResponseDto;
import com.example.carrot.location.entity.Location;
import com.example.carrot.location.repository.LocationRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Transactional(readOnly = true)
@Service
@RequiredArgsConstructor
public class LocationService {

	private final LocationRepository locationRepository;

	public Location findLocation(Long locationId) {
		return locationRepository.findById(locationId)
			.orElseThrow(() -> new CustomException(StatusCode.NOT_FOUND_LOCATION));
	}

	public List<LocationResponseDto> searchLocations(String keyword) {
		return locationRepository.findLocationsByKeyword(keyword).stream()
			.map(LocationResponseDto::of)
			.collect(Collectors.toList());
	}
}
