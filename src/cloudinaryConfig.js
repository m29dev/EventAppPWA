import { Cloudinary } from '@cloudinary/url-gen'
import { auto } from '@cloudinary/url-gen/actions/resize'
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity'

const cld = new Cloudinary({ cloud: { cloudName: 'dztgvmp1p' } })

export const uploadImage = () => {
    // Use this sample image or upload your own via the Media Explorer
    const img = cld
        .image('cld-sample-5')
        .format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
        .quality('auto')
        .resize(auto().gravity(autoGravity()).width(500).height(500)) // Transform the image: auto-crop to square aspect_ratio

    console.log(img)
}
