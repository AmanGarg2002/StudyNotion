export const GetAvgRating = (ratingArr) => {
  if (ratingArr?.length === 0) return 0;
  const totalReviewCount = ratingArr?.reduce((acc, current) => {
    acc += current.rating;
    return acc;
  }, 0);

  const multipier = Math.pow(10, 1);
  const avgReviewCount =
    Math.round((totalReviewCount / ratingArr?.length) * multipier) / multipier;

  return avgReviewCount;
};
