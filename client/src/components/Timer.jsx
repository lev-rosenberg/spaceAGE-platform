import { useStageTimer } from '@empirica/core/player/classic/react';
import React from 'react';
import styles from '../styles/timer.module.css';

export function Timer() {
  const timer = useStageTimer();

  let remaining;
  if (timer?.remaining || timer?.remaining === 0) {
    remaining = Math.round(timer?.remaining / 1000);
  }

  const isTimeRunningOut = remaining <= 120;

  return (
    <div className="flex flex-col items-center">
      <h1
  className={`tabular-nums text-3xl font-semibold`}
  style={{ color: isTimeRunningOut ? 'var(--accent-blue)' : 'rgba(107, 114, 128, 1)' }} // Change to accent color or gray
>
  {humanTimer(remaining)}
</h1>
      {remaining && isTimeRunningOut && (
        <p className="text-white-400 mt-4">
          Time running out!
        </p>
      )}
    </div>
  );
}

function humanTimer(seconds) {
  if (seconds === null || seconds === undefined) {
    return '--:--';
  }

  let out = '';
  const s = seconds % 60;
  out += s < 10 ? '0' + s : s;

  const min = (seconds - s) / 60;
  if (min === 0) {
    return `00:${out}`;
  }

  const m = min % 60;
  out = `${m < 10 ? '0' + m : m}:${out}`;

  const h = (min - m) / 60;
  if (h === 0) {
    return out;
  }

  return `${h}:${out}`;
}
