package com.example.carrot.location.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.example.carrot.global.common.BaseCreatedTimeEntity;
import com.example.carrot.product.entity.Product;
import com.example.carrot.user_location.entity.UserLocation;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Location extends BaseCreatedTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long locationId;

	@Column(nullable = false)
	private String name;

	@OneToMany(mappedBy = "location", cascade = CascadeType.PERSIST)
	private List<Product> products = new ArrayList<>();

	@OneToMany(mappedBy = "location", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<UserLocation> userLocations = new ArrayList<>();

	public Location(String name) {
		this.name = name;
	}
}
