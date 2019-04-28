
var arr = [
  {
    'guest_type': 'crew',
    'first_name': 'Marco',
    'last_name': 'Burns',
    'guest_booking': {
        'room_no': 'A0073',
        'some_array': [7,2,4]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'John',
    'last_name': 'Doe',
    'guest_booking': {
        'room_no': 'C73',
        'some_array': [1,3,5,2,4,3]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'Jane',
    'last_name': 'Doe',
    'guest_booking': {
        'room_no': 'C73',
        'some_array': [1,3,5,2,4,3]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'Albert',
    'last_name': 'Einstein',
    'guest_booking': {
        'room_no': 'B15',
        'some_array': [2,5,6,3]
    },
  },
  {
    'guest_type': 'crew',
    'first_name': 'Jack',
    'last_name': 'Daniels',
    'guest_booking': {
        'room_no': 'B15',
        'some_array': [2,5,6,3]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'Alan',
    'last_name': 'Turing',
    'guest_booking': {
        'room_no': 'B15',
        'some_array': [2,5,6,3]
    },
  },
];

// challenge # 1
function mutateFlatArray(objToModify, nestedObj) {
  // dot notate into child as passed in (could be replaced with objToModify.guest_booking)
  const child = objToModify[nestedObj];

  //coalesce - this has our original object, and the nested object values 
  const flatObj = {...objToModify, ...child};

  //delete our nestedObj to avoid duplicates
  delete flatObj[nestedObj];
  return flatObj;
};

// challenge # 2
function someTotalArray(objToModify) {
  // make sure it exists
  if(objToModify) {
    // iterate through and do our transformation
      // reduce to get sum
      var numTotals = objToModify.some_array.reduce(function(sum, value) {
        return sum + value;
      });
      // rename prop
      objToModify.some_total = numTotals;
      delete objToModify.some_array;
      return objToModify;
  }
  testVar = objToModify;
  return objToModify;
}


const flatArr = arr.map(input => mutateFlatArray(input, 'guest_booking'));
//spread operator deep copy - otherwise both challenge #2 and #3 arrays are modified (this was a pain to figure out - lots of fun google)
const clonedFlat = flatArr.map(x => ({...x}));
const totalArr = clonedFlat.map(input => someTotalArray(input));
// just used js filter
// challenge # 3
const filteredArr = clonedFlat.filter(input => input.guest_type === 'guest');
// just used js sort

// another spread operator deep copy to maintain integrity of challenge # 3
const clonedFiltered = filteredArr.map(y => ({...y}));

// challenge # 4
const alphaOrderArr = clonedFiltered.sort(function(a, b) {
  if (a.last_name === b.last_name) {
    if(a.first_name < b.first_name) {
      return -1;
    }
  }
  if(a.last_name < b.last_name) { return -1 };
  if(a.last_name > b.last_name) { return 1 };
  return 0;
});

$(document).ready(function() {
  $('#originalArray').html(JSON.stringify(arr, null, 2));
  $('#flatResultsArray').html(JSON.stringify(flatArr, null, 2));
  $('#someTotalResultsArray').html(JSON.stringify(totalArr, null, 2));
  $('#filterGuestResultsArray').html(JSON.stringify(filteredArr, null, 2));
  $('#sortAlphaResultsArray').html(JSON.stringify(alphaOrderArr, null, 2));
});
