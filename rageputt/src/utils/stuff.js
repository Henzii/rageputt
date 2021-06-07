export const laskePisteet = (tulokset) => {

    let pisteet = 0
    let dist = 10

    for (var i = 0; i < tulokset.length; i++ ) {
        if (!tulokset[i]) return pisteet
        pisteet += tulokset[i]*dist
        dist = 5+tulokset[i]
    }
    return pisteet
}
