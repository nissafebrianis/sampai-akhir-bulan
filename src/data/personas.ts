import type { Persona } from "../types/simulation";

export const PERSONAS: Persona[] = [
  {
    id: "sma",
    label: "Anak SMA",
    summary: "Uang saku mingguan, tugas sekolah, ajakan teman",
    context:
      "Uang saku mingguan, tugas sekolah yang menumpuk, dan ajakan teman yang sering datang tiba-tiba.",
    startingMoney: 250000,
    targetMoney: 90000,
    startingStats: {
      money: 250000,
      mood: 70,
      focus: 70,
      relationship: 70,
      targetProgress: 30,
    },
    dailyCosts: [],
  },
  {
    id: "mahasiswa",
    label: "Mahasiswa Awal",
    summary: "Uang bulanan, kos, makan, organisasi, freelance kecil",
    context:
      "Uang bulanan yang harus membiayai kos, makan, organisasi kampus, dan kadang freelance kecil.",
    startingMoney: 1200000,
    targetMoney: 250000,
    startingStats: {
      money: 1200000,
      mood: 70,
      focus: 70,
      relationship: 70,
      targetProgress: 25,
    },
    dailyCosts: [
      { day: 1, amount: 40000, label: "Makan" },
      { day: 2, amount: 40000, label: "Makan" },
      { day: 3, amount: 40000, label: "Makan" },
      { day: 3, amount: 100000, label: "Paket data" },
      { day: 4, amount: 40000, label: "Makan" },
      { day: 5, amount: 40000, label: "Makan" },
      { day: 6, amount: 40000, label: "Makan" },
      { day: 7, amount: 40000, label: "Makan" },
      { day: 7, amount: 200000, label: "Sabun dan kebutuhan kos" },
      { day: 8, amount: 40000, label: "Makan" },
      { day: 9, amount: 40000, label: "Makan" },
      { day: 10, amount: 40000, label: "Makan" },
    ],
  },
];

export function getPersona(id: string): Persona {
  const found = PERSONAS.find((p) => p.id === id);
  if (!found) {
    return PERSONAS[0];
  }
  return found;
}
