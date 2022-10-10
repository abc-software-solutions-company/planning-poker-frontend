interface INumberKey {
  [index: number]: string;
}

const Fibonacci: INumberKey = {0: '0', 1: '1', 2: '2', 3: '3', 5: '5', 8: '8', 13: '13', 21: '21'};
const Tshirt: INumberKey = {1: 'XS', 2: 'S', 3: 'M', 4: 'L', 5: 'XL', 6: 'XXL'};

export const StoryTypes = {Fibonacci, Tshirt};

export const ChartColors = ['#1E293B', '#4ADE80', '#FB923C', '#F87171', '#FFC90C', '#F472B6', '#60A5FA', '#C084FC'];
