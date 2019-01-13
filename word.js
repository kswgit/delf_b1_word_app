const french = [
    { w: "manger" },
    { w: "1234" },
    { w: "manger" },
    { w: "1234" },
    { w: "manger" },
    { w: "1234" },
    { w: "manger" },
    { w: "1234" },
]

const korean = [
    { w: `먹다\n머어억다` },
    { w: `ㅁㄴㅇㄹㄴㅁㅇㄹ\nㅁㄴㅇㄹㄴㅁㅇㄹ` },
    { w: `먹다\n머어억다` },
    { w: `ㅁㄴㅇㄹㄴㅁㅇㄹ\nㅁㄴㅇㄹㄴㅁㅇㄹ` },
    { w: `먹다\n머어억다` },
    { w: `ㅁㄴㅇㄹㄴㅁㅇㄹ\nㅁㄴㅇㄹㄴㅁㅇㄹ` },
    { w: `먹다\n머어억다` },
    { w: `ㅁㄴㅇㄹㄴㅁㅇㄹ\nㅁㄴㅇㄹㄴㅁㅇㄹ` },
]

french.forEach((e, idx) => e.id = idx)
korean.forEach((e, idx) => e.id = idx)

const sort = (ws, desc = false) => {
    ws.sort((a, b) => (a.id - b.id) * (desc ? -1 : 1))
    return ws
}

/*
Fisher-Yates Shuffle
https://bost.ocks.org/mike/shuffle/
*/
const shuffle = (ws, seed = 1) => {
    const n = ws.length - 1
    for(let i = 0; i < n; i++) {
        const m = n - i
        const rv = Math.floor(Math.random() * m * (Math.sin(seed) || Math.cos(seed)));
        const tmp = ws[m]
        ws[m] = ws[rv]
        ws[rv] = tmp
    }
    return ws
}
const combine = (base, other) => {
    if (!base.length) { return [] }
    const o = other.map(e => sort(e))
    const rs = []
    base.forEach(e => {
        rs.push(e)
        o.forEach(l => {
            rs.push(l[e.id])
        })
    })
    return rs
}

const depart = wordset => {
    if (!wordset.length) { return [] }
    let l = 0
    wordset.forEach(e => {
        if (e.id === wordset[0].id) { l++ }
    })
    return wordset.reduce((acc, inc, idx) => {
        acc[idx % l].push(inc)
        return acc
    }, Array(l).fill(null).map(() => []))
}


module.exports = { french, korean, combine, depart, shuffle, sort }