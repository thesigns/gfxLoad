// gfxLoad 0.1
// written by Jakub Adamczyk
// https://thesigns.icu

export async function gfxLoad(gfxSource) {

    let gfxFlatArray = [];

    // Create flat array from the gfxSource object
    // Only strings and arrays of strings are allowed in the object.
    // If there are other types throw error.
    //
    Object.keys(gfxSource).forEach(key => {
        if (typeof gfxSource[key] === 'string') {
            gfxFlatArray.push(gfxSource[key]);
        } else if (Array.isArray(gfxSource[key])) {
            gfxSource[key].forEach(element => {
                if (typeof element === 'string') {
                    gfxFlatArray.push(element);
                } else {
                    throw new Error('gfxLoad: malformed gfxSource');
                }
            });
        } else {
            throw new Error('gfxLoad: malformed gfxSource');
        }
    });

    // Load the images from the flat array.
    //
    const promise = Promise.allSettled(gfxFlatArray.map(url => {
        return new Promise(async (resolve, reject) => {
            const img = new Image();
            img.src = url;
            try {
                await img.decode();
            } catch (err) {
                reject(err);
            }
            resolve(img);
        });

    // Create gfx object with corresponging to the gfxSource object.
    //
    })).then(result => {
        let gfx = Object.assign({}, gfxSource);
        let i = 0;
        Object.keys(gfxSource).forEach(key => {
            if (Array.isArray(gfxSource[key])) {
                gfxSource[key].forEach((element, index) => {
                    if (result[i].status === "rejected") {
                        throw new Error("gfxLoad: could not load image: " + element);
                    }
                    gfx[key][index] = result[i].value;
                    i += 1;
                });
            } else {
                if (result[i].status === "rejected") {
                    throw new Error("gfxLoad: could not load image: " + gfxSource[key]);
                }
                gfx[key] = result[i].value;
                i += 1;
            }
        });
        return gfx;
    });

    return promise;
}
