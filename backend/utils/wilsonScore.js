export function calculateWilsonScore(positive, total, confident = 0.95) {
  if (total === 0) return 0;
  const z = 1.96; //z score for 95% confidence

  const phat = positive / total;

  const numerator =
    phat +
    (z * z) / (2 * total) -
    z * Math.sqrt((phat * (1 - phat) + (z * z) / (4 * total)) / total);

  const denominator = 1 + (z * z) / total;

  return numerator / denominator;
}
