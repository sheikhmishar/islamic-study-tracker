const Student = require('../Student')
const mongoose = require('mongoose')

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

const up = async () => {
  const prevCollection = await Student.find()
    .lean()
    .exec()

  const newCollection = prevCollection.map(prevDocument =>
    processDocumentUp(prevDocument)
  )
  console.log('upgrade done', new Date().toISOString())
  return { prevCollection, newCollection }
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

const down = async () => {
  const newCollection = await Student.find()
    .lean()
    .exec()

  const prevCollection = newCollection.map(prevDocument =>
    processDocumentDown(prevDocument)
  )
  console.log('downgrade done', new Date().toISOString())
  return { prevCollection: newCollection, newCollection: prevCollection }
}
////////////////////////////////////////////////////////////////
// START DOWN
////////////////////////////////////////////////////////////////

module.exports = { up, down }
