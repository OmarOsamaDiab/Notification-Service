require("dotenv").config()
// this function for spilting data into chunks
const chunk = data => {
    const _chunkSize = process.env.CHUNK_SIZE
    const chunks = []
    for (let i = 0; i < data.length; i += _chunkSize) {
        chunks.push(data.slice(i, i + _chunksize))
    }
    return chunks
}

module.exports = chunk