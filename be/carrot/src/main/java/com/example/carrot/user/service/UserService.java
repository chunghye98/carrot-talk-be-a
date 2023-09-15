package com.example.carrot.user.service;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.client.WebClient;

import com.example.carrot.global.exception.CustomException;
import com.example.carrot.global.exception.StatusCode;
import com.example.carrot.global.jwt.Jwt;
import com.example.carrot.global.jwt.JwtProvider;
import com.example.carrot.location.entity.Location;
import com.example.carrot.location.service.LocationService;
import com.example.carrot.user.dto.request.LoginRequestDto;
import com.example.carrot.user.dto.request.LogoutRequestDto;
import com.example.carrot.user.dto.request.ReissueRequestDto;
import com.example.carrot.user.dto.request.SignUpRequestDto;
import com.example.carrot.user.dto.response.LoginUserResponseDto;
import com.example.carrot.user.dto.response.OauthTokenResponseDto;
import com.example.carrot.user.dto.response.ReissueResponseDto;
import com.example.carrot.user.dto.response.UserResponseDto;
import com.example.carrot.user.entity.User;
import com.example.carrot.user.repository.UserRepository;
import com.example.carrot.user_location.entity.UserLocation;
import com.example.carrot.user_location.service.UserLocationService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional(readOnly = true)
public class UserService {
	private static final String KAKAO_TOKEN_URI = "https://kauth.kakao.com/oauth/token";
	private static final String KAKAO_USER_ME_URI = "https://kapi.kakao.com/v2/user/me";

	private final LocationService locationService;
	private final UserLocationService userLocationService;
	private final UserRepository userRepository;
	private final JwtProvider jwtProvider;
	@Value("${oauth.kakao.client_id}")
	private String clientId;
	@Value("${oauth.kakao.client_secret}")
	private String clientSecret;
	@Value("${oauth.kakao.grant_type}")
	private String grantType;
	@Value("${oauth.kakao.redirect_uri}")
	private String redirectUri;

	public UserService(LocationService locationService, UserLocationService userLocationService, UserRepository userRepository,
		JwtProvider jwtProvider) {
		this.locationService = locationService;
		this.userLocationService = userLocationService;
		this.userRepository = userRepository;
		this.jwtProvider = jwtProvider;
	}

	@Transactional
	public UserResponseDto kakaoLogin(LoginRequestDto loginRequestDto) {
		OauthTokenResponseDto tokenResponse = getToken(loginRequestDto.getCode());

		Map<String, Object> userInfo = findUserInfo(tokenResponse.getAccessToken());

		String socialId = String.valueOf(userInfo.get("id"));
		String imgUrl = String.valueOf(
			((Map)((Map)userInfo.get("kakao_account")).get("profile")).get("thumbnail_image_url"));

		Optional<User> user = userRepository.findBySocialId(socialId);

		if (user.isEmpty()) {
			log.info("최초 로그인 유저");
			Jwt jwt = jwtProvider.createJwt(Map.of("imgUrl", imgUrl, "socialId", socialId));
			return UserResponseDto.of(jwt.getAccessToken(), false);
		}

		log.info("로그인 유저");
		User findUser = user.get();
		Jwt jwt = jwtProvider.createJwt(Map.of("userId", findUser.getUserId()));
		findUser.updateRefreshToken(jwt);

		return UserResponseDto.of(
			jwt,
			LoginUserResponseDto.of(findUser.getUserId(), findUser.getNickName(), findUser.getImageUrl()),
			true);
	}

	private OauthTokenResponseDto getToken(String code) {
		MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
		formData.add("code", code);
		formData.add("client_id", clientId);
		formData.add("grant_type", grantType);
		formData.add("client_secret", clientSecret);
		formData.add("redirect_uri", redirectUri);

		return WebClient.create()
			.post()
			.uri(KAKAO_TOKEN_URI)
			.header("Content-type", "application/x-www-form-urlencoded;charset=utf-8")
			.bodyValue(formData)
			.retrieve()
			.bodyToMono(OauthTokenResponseDto.class)
			.block();
	}

	private Map<String, Object> findUserInfo(String accessToken) {
		return WebClient.create()
			.get()
			.uri(KAKAO_USER_ME_URI)
			.header("Content-type", "application/x-www-form-urlencoded;charset=utf-8")
			.header("Authorization", "Bearer " + accessToken)
			.retrieve()
			.bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {
			})
			.block();
	}

	@Transactional
	public UserResponseDto kakaoSignUp(SignUpRequestDto signUpRequestDto, String socialId, String imgUrl) {
		User user = userRepository.save(SignUpRequestDto.toEntity(signUpRequestDto.getNickname(), socialId, imgUrl));

		Location mainLocation = locationService.findLocation(signUpRequestDto.getMainLocationId());
		userLocationService.saveUserLocation(UserLocation.of(user, mainLocation, true));

		if (signUpRequestDto.getSubLocationId() != null) {
			Location subLocation = locationService.findLocation(signUpRequestDto.getSubLocationId());
			userLocationService.saveUserLocation(UserLocation.of(user, subLocation, false));
		}

		Jwt jwt = jwtProvider.createJwt(Map.of("userId", user.getUserId()));
		user.updateRefreshToken(jwt);

		return UserResponseDto.of(
			jwt,
			LoginUserResponseDto.of(user.getUserId(), user.getNickName(), user.getImageUrl()),
			true);
	}

	@Transactional
	public void checkNickNameDuplicate(String nickname) {
		if (userRepository.existsByNickName(nickname)) {
			throw new CustomException(StatusCode.ALREADY_EXIST_USER);
		}
	}

	public ReissueResponseDto reissueToken(ReissueRequestDto reissueRequestDto) {
		User user = userRepository.findByRefreshToken(reissueRequestDto.getRefreshToken())
			.orElseThrow(() -> new CustomException(StatusCode.NOT_FOUND_REFRESH_TOKEN));
		String accessToken = jwtProvider.reissueAccessToken(Map.of("userId", user.getUserId()));
		return ReissueResponseDto.from(accessToken);
	}

	@Transactional
	public void kakaoLogout(LogoutRequestDto logoutRequestDto, Long userId) {
		userRepository.updateRefreshTokenByUserIdAndRefreshToken(userId, logoutRequestDto.getRefreshToken());
	}

}
