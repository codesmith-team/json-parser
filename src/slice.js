function timeSlice(n) {
  var nums = [];
  for (var i = 0; i < n; i++) {
    nums[i] = i;
  }
  console.time('slice');
  nums.slice(10);
  console.timeEnd('slice');
}


timeSlice(1);
timeSlice(10);
timeSlice(100);
timeSlice(1000);
timeSlice(10000);
timeSlice(100000);
timeSlice(1000000);
timeSlice(10000000);
timeSlice(100000000);
