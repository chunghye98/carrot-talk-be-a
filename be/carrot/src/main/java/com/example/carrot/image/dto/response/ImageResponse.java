package com.example.carrot.image.dto.response;

import com.example.carrot.image.entity.Image;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class ImageResponse {

	@JsonProperty("imageId")
	private Long imageId;
	@JsonProperty("imageUrl")
	private String imageUrl;

	public static ImageResponse of(Image image) {
		return new ImageResponse(image.getImageId(), image.getImageUrl());
	}

}
