/**
 * @module modules/game/serverEvents
 */


/**
 * Server event types
 * @type {{SET_MAP: string, FIX_CUBIC: string, END_GAME: string}}
 */
const SERVER_EVENTS = {
    START_GAME: 'START_GAME',
    CUBIC_SET: 'CUBIC_SET',
    CUBIC_DROP: 'CUBIC_DROP',
    END_GAME: 'END_GAME'
};


const CLIENT_EVENTS = {
    READY: 'READY',
    SET_CUBIC: 'SET_CUBIC',
    CLOSE: 'CLOSE'
};

export {SERVER_EVENTS, CLIENT_EVENTS};