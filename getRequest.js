async function sendRequest() {
    const response = await fetch('https://petstore3.swagger.io/api/v3/pet/1', {
        method: 'GET'
    })
    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong')
    }

    const data = await response.json()
    console.log(data)
}

sendRequest()