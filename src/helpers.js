export const summaryDonations = (donations) => {
  if (!Array.isArray(donations) || donations.length == 0) return 0; // Fixed: summaryDonations function to handle when array is empty
  return donations.reduce((accumulator, value) => accumulator + value);
};
