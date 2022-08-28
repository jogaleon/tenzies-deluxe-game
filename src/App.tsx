import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DiceContextProvider } from './context/DiceContext';
import { GameContextProivder } from './context/GameContext';
import { TimerContextProivder } from './context/TimerContext';

import Game from './pages/game';
import Leaderboard from './pages/leaderboard';
import MainMenu from './pages/main-menu';
import './App.css';
import { RecordContextProivder } from './context/RecordContext';
import Tutorial from './pages/tutorial';

function App() {
  return (
    <div className="App">
    <GameContextProivder>
      <DiceContextProvider>
        <TimerContextProivder>
          <RecordContextProivder>
            <BrowserRouter>
              <Routes>
                  <Route index element={<MainMenu /> } />
                  <Route path="/play" element={<Game />} />
                  <Route path="/leaderboards" element={<Leaderboard />} />
                  <Route path="/tutorial" element={<Tutorial />} />
                  <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </BrowserRouter>
          </RecordContextProivder>
        </TimerContextProivder>
      </DiceContextProvider>
    </GameContextProivder>
    </div>
  );
}

export default App;
