import AsyncStorage from '@react-native-async-storage/async-storage';
import { USE_STORAGE_LOGGING } from '../Services/SettingsService'

let isLogging = false;
const logQueue: string[] = [];

const processQueue = async () => {
    if (isLogging || logQueue.length === 0) return;

    isLogging = true;
    const currentLog = logQueue.shift(); // Obtiene el primer elemento de la cola

    let logs = (await AsyncStorage.getItem("log")) || "";
    logs += `${currentLog}\n`;

    await AsyncStorage.setItem("log", logs).then(() => {
        isLogging = false;
        if (logQueue.length > 0) {
            processQueue(); // Procesa el siguiente elemento en la cola si hay alguno
        }
    });
};

const formatArgs = (args: any[]): string => {
    return args.map(arg => {
        if (typeof arg === 'object') {
            try {
                return JSON.stringify(arg);
            } catch (error) {
                return "Error al serializar objeto";
            }
        }
        return String(arg);
    }).join(' ');
};

const enqueueLog = (prefix: string, ...args: any[]) => {
    if (!USE_STORAGE_LOGGING)
        return;

    const formattedArgs = formatArgs(args);
    const logEntry = `[${prefix}] ${formattedArgs}`;
    logQueue.push(logEntry);
    processQueue();
};

export const Logger = {
    log: (...args: any[]) => { enqueueLog("INFO", ...args); console.log(...args); },
    warn: (...args: any[]) => { enqueueLog("WARNING", ...args); console.log(...args); },
    error: (...args: any[]) => { enqueueLog("ERROR", ...args); console.log(...args); },
};