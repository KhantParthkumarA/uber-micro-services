const getSearchRegexp = async (value) => {
    if (value.toString().startsWith('+')) { return value.slice(1) }
    if (value.toString().startsWith('???')) { value = value.replace('???', '?') }
    if (value.toString().startsWith('[')) { value = value.slice(1) }
    if (value.toString().startsWith('(')) { value = value.slice(1) }
    const result = { $regex: `.*` + value.trim() + '.*', $options: '-i' }
    return result
}

module.exports = { getSearchRegexp };