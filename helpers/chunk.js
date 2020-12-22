// this function for spilting data into chunks
const chunk = tokens => {
    const _chunkSize = 450
    const chunks = []
    for (let i = 0; i < tokens.length; i += _chunkSize) {
        chunks.push(tokens.slice(i, i + _chunksize))
    }
    return chunks
}

module.exports = chunk