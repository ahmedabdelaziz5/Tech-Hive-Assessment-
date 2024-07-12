export const clearArrayOfObjects = (arrayOfObjects) =>
{
    //delete any empty object in array of objects
    const filteredObjects = arrayOfObjects.filter(object =>
    {
        // Check if the object is empty
        if (object._id) delete object._id;
        const isEmpty = Object.values(object).every(value => !value);
        return !isEmpty;
    });
    return filteredObjects;
}