package com.example.carrot.like.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ModifyLikeResponseDto {

	@JsonProperty("isLiked")
	private boolean isLiked;

	public ModifyLikeResponseDto(boolean isLiked) {
		this.isLiked = isLiked;
	}

	public static ModifyLikeResponseDto of(boolean isLiked) {
		return new ModifyLikeResponseDto(isLiked);
	}
}
