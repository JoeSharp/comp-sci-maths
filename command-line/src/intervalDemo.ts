import simpleLogger from './simpleLogger'

simpleLogger.info('Program Is Starting')

simpleLogger.info('ONE')

// After 500 ms, execute the function passed in
setTimeout(() => {
    simpleLogger.info('TWO')
}, 500)

simpleLogger.info('THREE')