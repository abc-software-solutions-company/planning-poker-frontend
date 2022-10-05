interface INumberKey {
  [index: number]: string;
}

const Fibonacci: INumberKey = {0: '0', 1: '1', 2: '2', 3: '3', 5: '5', 8: '8', 13: '13', 21: '21'};
const Tshirt: INumberKey = {1: 'XS', 2: 'S', 3: 'M', 4: 'L', 5: 'XL', 6: 'XXL'};

export const StoryTypes = {Fibonacci, Tshirt};

export const ABCWEBSITE = 'https://www.abcsoftwarecompany.com/';

export const CHARTCOLORS: INumberKey = {
  0: '#1E293B',
  1: '#4ADE80',
  2: '#FB923C',
  3: '#F87171',
  5: '#FFC90C',
  8: '#F472B6',
  13: '#60A5FA',
  21: '#C084FC'
};
