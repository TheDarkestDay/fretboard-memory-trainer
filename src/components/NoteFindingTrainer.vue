<script setup lang="ts">
import { ref } from "vue";
import { NotesSequence } from "../NotesSequence";
import { FIRST_STRING } from "../note-ranges";
import { InputAudioDevice } from "../InputAudioDevice";
import type { Note } from "../Note";
import { sleep } from "../utils";

const expectedNote = ref<Note | null>(null);
const score = ref(0);
const gameState = ref("setup");
const remainingTimeInSeconds = ref(0);
const roundDuration = 30;

let intervalHandle: number;

const handleTimerTick = () => {
  remainingTimeInSeconds.value = remainingTimeInSeconds.value - 1;

  if (remainingTimeInSeconds.value <= 0) {
    gameState.value = "end";
    clearInterval(intervalHandle);
  }
};

const startGame = async () => {
  const inputDevice = new InputAudioDevice();
  await inputDevice.startListening();
  const notesSequence = new NotesSequence(FIRST_STRING);

  score.value = 0;
  gameState.value = "inProgress";
  remainingTimeInSeconds.value = roundDuration;
  intervalHandle = setInterval(handleTimerTick, 1_000);

  while (gameState.value === "inProgress") {
    const nextNote = notesSequence.getNext();
    expectedNote.value = nextNote;

    const isGuessCorrect = await Promise.race([
      sleep(3_000).then(() => false),
      inputDevice.waitUntilNoteIsPlayed(nextNote).then(() => true)
    ]);

    if (isGuessCorrect) {
      score.value = score.value + 1;
    }
  }
}

const handleStartButtonClick = async () => {
  startGame();
};

const handleRestartButtonClick = () => {
  startGame();
};
</script>

<template>
    <main class="layout centered-content">
      <div class="grid">
        <section class="card hero">
          <div class="full-height centered-content" v-if="gameState === 'setup'">
            <button class="button" @click="handleStartButtonClick">
              Start
            </button>
          </div>
          
          <div v-if="gameState === 'inProgress'">
            <h2 class="title">
              Play this note: 
            </h2>

            <p class="targetNote">
              {{ expectedNote?.getName() }}
            </p>
          </div>

          <div v-if="gameState === 'end'">
            <h2 class="title">
              Time's up!
            </h2>

            <button class="button" @click="handleRestartButtonClick">
              Restart
            </button>
          </div>
        </section>

        <section class="card timer">
          <h2>
            Remaining time:
          </h2>

          <p>{{ remainingTimeInSeconds }}</p>
        </section>

        <section class="card score">
          <h2>
            Score:
          </h2>

          <p>{{ score }}</p>
        </section>
    </div>
  </main>
</template>

<style scoped>
  .layout {
    height: 100vh;
  }

  .full-height {
    height: 100%;
  }

  .centered-content {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .grid {
    display: grid;
    gap: .5rem;
    grid-template-areas: 
      "hero hero"
      "timer score";
    grid-template-columns: 1fr 1fr;
  }

  .hero {
    grid-area: hero;
    min-height: 30rem;
    text-align: center;
  }

  .button {
    padding: 2rem;
    font-size: 4rem;
    border-radius: 48px;
  }

  .title {
    font-size: 32px;
  }

  .targetNote {
    font-size: 96px;
  }

  .timer {
    grid-area: timer;
  }

  .score {
    grid-area: score;
  }

  .card {
    background-color: #ffffff;
    border-radius: 12px;
    padding: 1rem;
  }
</style>
