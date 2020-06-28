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
const { up, down } = require('./migration-student')
console.log('Init', new Date().toISOString())
const migrate = async direction => {
  const { prevCollection, newCollection } =
    direction === 'up' ? await up() : await down()
  writeJSONFile(prevCollection, 'test-dump-original')
  writeJSONFile(newCollection, 'test-dump-migrated')
}

migrate('up')
// migrate('down')
////////////////////////////////////////////////////////////////
// END
////////////////////////////////////////////////////////////////

setTimeout(mongoDestroy, 100)
