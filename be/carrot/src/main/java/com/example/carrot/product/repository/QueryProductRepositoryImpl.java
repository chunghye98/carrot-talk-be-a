package com.example.carrot.product.repository;

import static com.example.carrot.image.entity.QImage.*;
import static com.example.carrot.product.entity.QProduct.*;
import static com.example.carrot.product_image.entity.QProductImage.*;
import static com.querydsl.jpa.JPAExpressions.*;

import javax.persistence.EntityManager;

import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import com.example.carrot.like.entity.QLike;
import com.example.carrot.product.dto.response.ProductsResponseDto;
import com.querydsl.core.QueryResults;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.jpa.impl.JPAQueryFactory;

public class QueryProductRepositoryImpl implements QueryProductRepository {

	private static final Long DEFAULT_LOCATION_ID = 1L;

	private final JPAQueryFactory queryFactory;

	public QueryProductRepositoryImpl(EntityManager em) {
		this.queryFactory = new JPAQueryFactory(em);
	}

	@Override
	public Slice<ProductsResponseDto> findProducts(Long locationId, Long categoryId, Long nextId, int size) {

		QueryResults<ProductsResponseDto> results = queryFactory.select(
				Projections.constructor(
					ProductsResponseDto.class,
					product.productId,
					product.user.userId,
					product.name,
					image.imageUrl,
					product.location.name,
					product.createdAt,
					product.price,
					product.status,
					likeCountSubquery(product.productId)))
			.from(product)
			.leftJoin(product.productImages, productImage)
			.leftJoin(productImage.image, image)
			.where(
				productImage.isMain.isTrue(),
				productLessThan(nextId),
				locationEqual(locationId),
				categoryEqual(categoryId)
			)
			.orderBy(product.productId.desc())
			.limit(size + 1)
			.fetchResults();

		return new PageImpl<>(results.getResults(), Pageable.ofSize(size), results.getTotal());
	}

	private Predicate productLessThan(Long nextId) {
		if (nextId == null) {
			return null;
		}
		return product.productId.loe(nextId);
	}

	private Predicate locationEqual(Long locationId) {
		if (locationId == null) {
			return product.location.locationId.eq(DEFAULT_LOCATION_ID);
		}
		return product.location.locationId.eq(locationId);
	}

	private Expression<Long> likeCountSubquery(NumberPath<Long> productId) {
		QLike likeCounter = new QLike("likeCounter");

		return select(likeCounter.count())
			.from(likeCounter)
			.where(likeCounter.product.productId.eq(productId));
	}

	private Predicate categoryEqual(Long categoryId) {
		if (categoryId == null) {
			return null;
		}
		return product.category.categoryId.eq(categoryId);
	}
}
