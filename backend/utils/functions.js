
const generatePassword = () => {
    let r = Math.random().toString(36).slice(-8)
    console.log(r)
}

module.exports = generatePassword