<script setup>
import { usePlayerStore } from "../stores/players";
import readSerial from "../../readSerial/readSerial";

const playerStore = usePlayerStore();
const [port, parser] = readSerial();

port.on("open", () => {
  console.log("Serial port COM5 opened.");
});

// Read incoming data
parser.on("data", (data) => {
  console.log("Received:", data);
});

// Handle errors
port.on("error", (err) => {
  console.error("Serial Port Error:", err.message);
});
</script>
<template></template>