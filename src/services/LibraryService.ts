import fs from "fs";

function EncodeIMGtoBase64(path : string) : string | null{
    const image : Buffer = fs.readFileSync(path)

    if (image){
        return image.toString('base64')
    }
    return null
}