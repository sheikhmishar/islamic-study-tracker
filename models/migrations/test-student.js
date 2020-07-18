const { setupEnv, mongoInit, mongoDestroy } = require('../../config')
setupEnv()
mongoInit()
const writeJSONFile = (JSObject, fileName) => {
  const JSONPretty = JSObject => JSON.stringify(JSObject, null, 2)
  const { writeFile } = require('fs')
  const { join } = require('path')
  writeFile(
    join(__dirname, `${fileName}.json`),
    JSONPretty(JSObject),
    { encoding: 'utf8' },
    err => console.log(err ? err : `written ${fileName}.json`)
  )
}

////////////////////////////////////////////////////////////////
// START
////////////////////////////////////////////////////////////////
;(async () => {
  const Meta = require('../Meta')
  const currentRevision = await Meta.findOne()
    .lean()
    .exec()
    .then(metaInfo => (metaInfo ? metaInfo : new Meta().save()))
    .then(metaInfo => metaInfo.revision)

  const { up, down } = require('./migration-student')
  console.log('Init', new Date().toISOString())
  console.log('Current Revision', currentRevision)

  const migrate = async direction => {
    const { prevCollection, newCollection, metaInfo } =
      direction === 'up'
        ? await up(currentRevision)
        : await down(currentRevision)
    if (prevCollection.length)
      writeJSONFile(prevCollection, `test-dump-original-${currentRevision}`)
    if (newCollection.length)
      writeJSONFile(newCollection, `test-dump-migrated-${metaInfo.revision}`)
  }

  // migrate('up')
  // migrate('down')
})()

////////////////////////////////////////////////////////////////
// END
////////////////////////////////////////////////////////////////

setTimeout(mongoDestroy, 100)
