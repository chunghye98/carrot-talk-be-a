package com.example.carrot.user.dto.request;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.example.carrot.user.entity.User;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class SignUpRequestDto {

	// TODO: @Size 회의 안건으로 정하기
	@NotNull(message = "닉네임 입력은 필수입니다.")
	@Size(min = 1, max = 10, message = "닉네임은 1글자 이상, 10글자 이하여야 합니다.")
	private String nickname;
	@NotNull(message = "메인 동네 입력은 필수입니다.")
	private Long mainLocationId;
	private Long subLocationId;

	@Builder
	public SignUpRequestDto(String nickname, Long mainLocationId, Long subLocationId) {
		this.nickname = nickname;
		this.mainLocationId = mainLocationId;
		this.subLocationId = subLocationId;
	}

	public static User toEntity(final String nickname, final String socialId, final String imgUrl) {
		return User.builder()
			.nickName(nickname)
			.socialId(socialId)
			.imageUrl(imgUrl)
			.build();
	}

}
