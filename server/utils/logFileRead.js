import fs from 'fs';
import path from 'path';

function formatTime(date) {
    const day = padZero(date.getDate());
    const month = padZero(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    const seconds = padZero(date.getSeconds());
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

function padZero(num) {
    return num.toString().padStart(2, '0');
}

function levelToWord(level) {
    switch (level) {
        case 10: return 'TRACE';
        case 20: return 'DEBUG';
        case 30: return 'INFO';
        case 40: return 'WARN';
        case 50: return 'ERROR';
        case 60: return 'FATAL';
        default: return 'UNKNOWN';
    }
}

function readLogFile(month, userId) {

    const logFilePath = path.join('app.log');
    const logs = fs.readFileSync(logFilePath, 'utf8').split('\n');

    const filteredLogs = logs.filter(log => log.trim() !== '').map(log => JSON.parse(log));

    const logsInMonth = filteredLogs.filter(log => {
        const logDate = new Date(log.time);
        const logYear = logDate.getFullYear();
        const logMonth = logDate.getMonth() + 1;
        const [inputYear, inputMonth] = month.split("-").map(Number);
    
        return logYear === inputYear && logMonth === inputMonth;
    });
    

    const logsFilteredByUser = userId === "all" ? logsInMonth : logsInMonth.filter(log => log.msg.includes(userId));

    const formattedLogs = logsFilteredByUser.map(log => {
        const { level, time, msg } = log;
        const formattedTime = formatTime(new Date(time));
        const levelWord = levelToWord(level);
        return { level: levelWord, time: formattedTime, msg };
    });


    return formattedLogs;
}

export default readLogFile;