// Splits URL at '/' and creates an array that can then
// be queried via an index
module.exports = (value, index) => {
    return value.split('/').slice(1, -1)[index];
}
