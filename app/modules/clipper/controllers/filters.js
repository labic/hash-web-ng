hash.filter('filterByTags', function () {
    if
    return function (items, tags) {
        var filtered = []; // Put here only items that match
        (items || []).forEach(function (item) { // Check each item
            var matches = tags.some(function (tag) {          // If there is some tag
                return (item.data1.indexOf(tag.text) > -1) || // that is a substring
                       (item.data2.indexOf(tag.text) > -1);   // of any property's value
            });                                               // we have a match
            if (matches) {           // If it matches
                filtered.push(item); // put it into the `filtered` array
            }
        });
        return filtered; // Return the array with items that match any tag
    };
});