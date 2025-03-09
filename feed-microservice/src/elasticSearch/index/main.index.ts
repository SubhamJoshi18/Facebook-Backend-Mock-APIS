


import { lmsLogger } from "../../libs/logger.libs"
import { createFacebookFeedIndex } from "./facebook_feed_alias"
import { createFacebookFeedPhotoIndex } from "./facebook_feed_photo_alias"


async function MergeAllIndices() {
    const indicesResult = await Promise.allSettled([
        createFacebookFeedIndex(),
        createFacebookFeedPhotoIndex()
    ])

    const filteredRejected = indicesResult.filter((data) => data.status !== 'fulfilled')
    if(Array.isArray(filteredRejected)) {
        for (const item of filteredRejected) {
            throw new Error(`Error while creating Index , Reason : ${item.reason}`,)
        }
    }
    lmsLogger.info(`All Indices Have been Created`)
    return
}


export default MergeAllIndices