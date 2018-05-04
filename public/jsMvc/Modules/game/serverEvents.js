/**
 * @module modules/game/serverEvents
 */


/**
 * Server event types
 * @type {{START_GAME: string, CUBIC_SET: string, CUBIC_DROP: string, END_GAME: string}}
 */
const SERVER_EVENTS = {
    START_GAME: 'START_GAME',
    CUBIC_SET: 'CUBIC_SET',
    CUBIC_DROP: 'CUBIC_DROP',
    END_GAME: 'END_GAME'
};

/**
 * Client event types
 * @type {{READY: string, SET_CUBIC: string, CLOSE: string}}
 */
const CLIENT_EVENTS = {
    READY: 'READY',
    SET_CUBIC: 'SET_CUBIC',
    CLOSE: 'CLOSE'
};

export {SERVER_EVENTS, CLIENT_EVENTS};