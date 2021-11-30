export default baseUrl => async(uri, option = {}) => {
    const data = await fetch(baseUrl + uri, option)
    return data
}
