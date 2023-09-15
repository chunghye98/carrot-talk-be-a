package com.example.carrot.global.jwt;

import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Component
@Getter
@Slf4j
public class JwtProvider {

	private final Long ACCESS_TOKEN_EXP_TIME = 1000L * 60 * 60; // 1시간
	private final Long REFRESH_TOKEN_EXP_TIME = 1000L * 7L * 24 * 60 * 60; // 1주일

	@Value("${jwt.secret_key}")
	private String secretKey;

	public Jwt createJwt(Map<String, Object> claims) {
		String accessToken = createToken(claims, getExpireDateAccessToken());
		String refreshToken = createToken(new HashMap<>(), getExpireDateRefreshToken());

		return Jwt.builder()
			.accessToken(accessToken)
			.refreshToken(refreshToken)
			.build();
	}

	public String reissueAccessToken(Map<String, Object> claims) {
		return createToken(claims, getExpireDateAccessToken());
	}

	public String createToken(Map<String, Object> claims, Date expiration) {
		return Jwts.builder()
			.setClaims(claims)
			.setExpiration(expiration)
			.signWith(SignatureAlgorithm.HS256,
				Base64.getEncoder().encodeToString(secretKey.getBytes()))
			.compact();
	}

	public Date getExpireDateAccessToken() {
		return new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXP_TIME);
	}

	public Date getExpireDateRefreshToken() {
		return new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXP_TIME);
	}

	public Claims getClaims(String token) {
		return Jwts.parser()
			.setSigningKey(Base64.getEncoder().encodeToString(secretKey.getBytes()))
			.parseClaimsJws(token)
			.getBody();
	}

}
