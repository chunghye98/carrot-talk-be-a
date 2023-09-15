export const formatPrice = (price: number) => {
  if (price === 0) return '가격 없음';

  const billionUnits = Math.floor(price / 100000000);
  const tenThousandUnits = Math.floor((price % 100000000) / 10000);

  if (billionUnits && tenThousandUnits)
    return `${billionUnits}억 ${tenThousandUnits}만원`;
  if (billionUnits) return `${billionUnits}억`;
  if (price >= 1000000) return `${tenThousandUnits}만원`;

  return `${price.toLocaleString('ko-KR')}원`;
};
