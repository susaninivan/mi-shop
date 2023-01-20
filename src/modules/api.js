// export const getData = function(patch) {
//     return fetch(patch).then(response => response.json())
// }

export const getData = (patch) => {
    return fetch(patch).then(response => response.json())
}