export function range(start, end, step) {
  var index = -1,
    length = Math.max(Math.ceil((end + step - start) / (step || 1)), 0),
    result = Array(length);

  while (length--) {
    result[++index] = start;
    start += step;
  }

  return result;
}
