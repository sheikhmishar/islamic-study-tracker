const Student = require('../Student')
const mongoose = require('mongoose')
const Meta = require('../Meta')

const upgradeRevision = 2
const downgradeRevision = 1

////////////////////////////////////////////////////////////////
// START UP
////////////////////////////////////////////////////////////////
const processDocumentUp = prevDocument => ({
  ...prevDocument,
  data: {
    enrolledCourses: [
      {
        courseInfo: 'coursesRefObjectId',
        courseProgress: prevDocument.data.map(
          ({ _id, contentId, videoEndPosition, ...prevData }) => ({
            contentInfo: 'courseContentRefObjectId',
            lastPosition: videoEndPosition,
            ...prevData
          })
        )
      }
    ]
  }
})

const up = async currentRevision => {
  if (currentRevision !== downgradeRevision) {
    console.log(
      'Revision ' + downgradeRevision + ' required. Cannot continue...'
    )
    return {
      prevCollection: [],
      newCollection: [],
      metaInfo: { revision: currentRevision }
    }
  }

  const prevCollection = await Student.find()
    .lean()
    .exec()

  const newCollection = prevCollection.map(prevDocument =>
    processDocumentUp(prevDocument)
  )

  // const metaInfo = await Meta.findOneAndUpdate(
  //   {},
  //   { revision: upgradeRevision },
  //   { new: true }
  // ).exec()

  const metaInfo = { revision: upgradeRevision }

  console.log('upgrade done', new Date().toISOString())
  return { prevCollection, newCollection, metaInfo }
}
////////////////////////////////////////////////////////////////
// END UP
////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
// START DOWN
////////////////////////////////////////////////////////////////
const processDocumentDown = prevDocument => ({
  ...prevDocument,
  data: prevDocument.data.enrolledCourses[0].courseProgress.map(
    ({ lastPosition, ...prevData }) => ({
      contentId: mongoose.Types.ObjectId(), // TODO grab youtube id
      videoEndPosition: lastPosition,
      ...prevData
    })
  )
})

const down = async currentRevision => {
  if (currentRevision !== upgradeRevision) {
    console.log('Revision ' + upgradeRevision + ' required. Cannot continue...')
    return {
      prevCollection: [],
      newCollection: [],
      metaInfo: { revision: currentRevision }
    }
  }

  const newCollection = await Student.find()
    .lean()
    .exec()

  const prevCollection = newCollection.map(newDocument =>
    processDocumentDown(newDocument)
  )

  // const metaInfo = await Meta.findOneAndUpdate(
  //   {},
  //   { revision: downgradeRevision },
  //   { new: true }
  // ).exec()
  const metaInfo = { revision: downgradeRevision }

  console.log('downgrade done', new Date().toISOString())
  return {
    prevCollection: newCollection,
    newCollection: prevCollection,
    metaInfo
  }
}
////////////////////////////////////////////////////////////////
// START DOWN
////////////////////////////////////////////////////////////////

module.exports = { up, down }
