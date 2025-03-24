// Splits URL at '/' and creates an array that can then
// be queried via an index
export default (value, index) => {
    return value.split('/').slice(1, -1)[index];
}
