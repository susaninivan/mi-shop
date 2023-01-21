const apiPatch = "http://localhost:3001"

export const getData = (patch) =>{ 
   return fetch(apiPatch + patch).then(response => response.json())
}

// export const getData = function(patch) {
//     return fetch(patch).then( function(response) {
//         return response.json()
//     })
// }

// export const getData = (patch) => {
//     return fetch(patch)
//     .then(function(response){
//         return response.json()})
// }