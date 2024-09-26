import { summaryDonations } from '../helpers';

describe('helpers', function () {
  test('`summaryDonations` should calculate donations correctly', function () {
    expect(summaryDonations([1, 2, 3, 4])).toEqual(10);
    // ADD: handle when the array is empty
    expect(summaryDonations([])).toEqual(0);
    // ADD: handle when only one element in array
    expect(summaryDonations([2])).toEqual(2);
    // ADD: handle when array contains some negative value
    expect(summaryDonations([1, 2, 3, -4])).toEqual(2);
  });
});
