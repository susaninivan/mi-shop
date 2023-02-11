const apiPatch = "http://localhost:3001"

// export const getData = (patch) =>{ 
//    return fetch(apiPatch + patch).then(response => response.json())
// }

export const getData = function (patch) {
    return fetch(apiPatch + patch).then(function (response) {

        if (response.ok === false) {
            throw new Error('Ошибка...')
        }

        // console.log(response)
        return response.json()
    })
}

// export const getData = (patch) => {
//     return fetch(patch)
//     .then(function(response){
//         return response.json()})
// }

export const postData = function (path, data) {

    return fetch(apiPatch + path, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (response) {

        if (response.ok === false) {
            throw new Error('Ошибка...')
        }

        // console.log(response)
        return response.json()
    })

}

export const putData = function (path, data) {

    return fetch(apiPatch + path, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (response) {

        if (response.ok === false) {
            throw new Error('Ошибка...')
        }

        // console.log(response)
        return response.json()
    })

}

export const patchData = function (path, data) {

    return fetch(apiPatch + path, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (response) {

        if (response.ok === false) {
            throw new Error('Ошибка...')
        }

        // console.log(response)
        return response.json()
    })

}




export const deleteData = function (path) {

    return fetch(apiPatch + path, {
        method: "DELETE"
    }).then(function (response) {
        if (response.ok === false) {
            throw new Error("Ошибка...")
        }
        return response.json()
    })

}