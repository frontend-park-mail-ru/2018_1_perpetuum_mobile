/**
 * @module modules/game/serverEvents
 */


/**
 * Server event types
 * @type {{SET_MAP: string, FIX_CUBIC: string, END_GAME: string}}
 */
const SERVER_EVENTS = {
    START_GAME: 'START_GAME',
    CUBIC_TAKEN: 'CUBIC_TAKEN',
    CUBIC_SET: 'CUBIC_SET',
    UPDATE_SCORE: 'UPDATE_SCORE',
    WIN: 'WIN',
    LOSE: 'LOSE'
};


const CLIENT_EVENTS = {
    READY: 'READY',
    TAKE_CUBIC: 'TAKE_CUBIC',
    SET_CUBIC: 'SET_CUBIC',
    CLOSE: 'CLOSE'
};

export {SERVER_EVENTS, CLIENT_EVENTS};