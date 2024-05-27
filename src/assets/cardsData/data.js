import { assets } from "../assets";

const cardsData = [
  { icon: assets.compass_icon, text: "Create a futuristic image of a car" },
  {
    icon: assets.bulb_icon,
    text: "Give me some ideas to surprise my concert-loving friend on their birthday.",
  },
  {
    icon: assets.message_icon,
    text: "What’s the reaction to and impact of autonomous vehicles",
  },
  {
    icon: assets.code_icon,
    text: "What's the time it takes to walk to several landmarks",
  },
  {
    icon: assets.compass_icon,
    text: "Design a concept for a sustainable urban garden",
  },
  {
    icon: assets.bulb_icon,
    text: "Recommendations for starting a small business in the digital age",
  },
  {
    icon: assets.message_icon,
    text: "Exploring the potential of renewable energy sources",
  },
  {
    icon: assets.code_icon,
    text: "Comparing different programming languages for web development",
  },
  {
    icon: assets.compass_icon,
    text: "Tips for improving indoor air quality in your home",
  },
  {
    icon: assets.bulb_icon,
    text: "How to create engaging content for social media marketing",
  },
  {
    icon: assets.message_icon,
    text: "The future of remote work and its implications on society",
  },
  {
    icon: assets.code_icon,
    text: "Strategies for optimizing website performance and speed",
  },
];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

shuffleArray(cardsData);

export const firstFourItems = cardsData.slice(0, 4);
