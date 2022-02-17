import React from 'react';

interface StreakCounter {
    streak: number,
    onHit: () => void,
    onMiss: () => void
}


type StreakAction = 'Y' | 'N';

const streakReducer = (state: number, action: StreakAction) => action === 'Y' ? state + 1 : 0;

const useStreakCounter = (): StreakCounter => {

    const [streak, dispatch] = React.useReducer(streakReducer, 0);

    return {
        streak,
        onHit: React.useCallback(() => dispatch('Y'), []),
        onMiss: React.useCallback(() => dispatch('N'), []),
    }
}

export default useStreakCounter;