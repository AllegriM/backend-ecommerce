const log4js = require('log4js')

log4js.configure({
    appenders: {
        miLoggerConsole: {
            type: 'console'
        },
        miLoggerFile: {
            type: 'file', filename: 'info.log'
        },
        miLoggerFile2: {
            type: 'file', filename: 'info2.log'
        }
    },
    categories: {
        default: { appenders: ['miLoggerConsole'], level: 'trace' },
        console: { appenders: ['miLoggerConsole'], level: 'debug' },
        info: { appenders: ['miLoggerFile'], level: 'warn' },
        archivo: { appenders: ['miLoggerFile2'], level: 'info' },
        todos: { appenders: ['miLoggerConsole', 'miLoggerFile', 'miLoggerFile2'], level: 'error' }
    }
})