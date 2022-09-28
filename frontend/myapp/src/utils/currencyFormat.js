const currencyFormat = (price) => {
  price = price?.toString();
  price = price?.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

  return `${price} ₫`;
};
export default currencyFormat;
