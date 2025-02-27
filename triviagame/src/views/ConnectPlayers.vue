<script setup>
import { usePlayerStore } from "../stores/players";
import readSerial from "../../readSerial/readSerial";

const playerStore = usePlayerStore();
readSerial();
</script>
<template></template>