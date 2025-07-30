export interface Question {
  key: string;
  q: string;
  opts: string[] | null;
  note?: string;
}

export const assessmentQuestions: Question[] = [
  {
    key: "skin_feel_day",
    q: "Throughout the day, how does your skin typically feel?",
    opts: [
      "Tight and uncomfortable all day",
      "Comfortable in the morning, tight by afternoon",
      "Comfortable all day",
      "Oily or shiny by midday"
    ]
  },
  {
    key: "pore_size_nose",
    q: "How would you describe your pore size on your nose?",
    opts: [
      "Barely visible",
      "Small",
      "Noticeable",
      "Large and easily visible"
    ]
  },
  {
    key: "skin_feel_cleansing",
    q: "After cleansing, how does your skin feel?",
    opts: [
      "Very tight and dry",
      "Somewhat tight",
      "Soft and comfortable",
      "Clean but possibly oily"
    ]
  },
  {
    key: "breakout_frequency",
    q: "How often do you experience breakouts?",
    opts: [
      "Rarely",
      "Occasionally",
      "Frequently",
      "Almost constantly"
    ]
  },
  {
    key: "reaction_new_products",
    q: "How does your skin react to new products?",
    opts: [
      "Often irritated or red",
      "Sometimes irritated",
      "Rarely irritated",
      "Usually no reaction"
    ]
  },
  {
    key: "cheek_bounce_test",
    q: "When you gently pinch your cheek, how quickly does the skin bounce back?",
    opts: [
      "Very slowly (several seconds)",
      "Slowly",
      "Quickly",
      "Very quickly, but feels oily"
    ]
  },
  {
    key: "skin_texture",
    q: "How would you describe your skin's texture (Feel it now sliding your hand or fingers on your face slowly)?",
    opts: [
      "Rough and flaky",
      "Slightly rough in some areas",
      "Smooth",
      "Smooth but prone to oiliness"
    ]
  },
  {
    key: "sun_exposure",
    q: "How much time do you typically spend in direct sunlight per day?",
    opts: [
      "Less than 15 minutes",
      "Less than 30 minutes",
      "30 minutes to 1 hour",
      "1 to 3 hours",
      "More than 3 hours"
    ]
  },
  {
    key: "daily_water_intake",
    q: "How many glasses of water do you usually drink per day?",
    opts: [
      "Less than 4 glasses",
      "4-6 glasses",
      "7-9 glasses",
      "10 or more glasses",
      "Depends on the day"
    ]
  },
  {
    key: "sleep_pattern",
    q: "How many hours of quality sleep do you get on average?",
    opts: [
      "Less than 5 hours",
      "5-6 hours (inconsistent)",
      "7-8 hours",
      "More than 8 hours",
      "Varies, but at least 5 hours"
    ]
  },
  {
    key: "work_hours",
    q: "On average, how many hours a day do you work or use screens?",
    opts: [
      "Less than 4 hours",
      "4-6 hours",
      "7-9 hours",
      "10 or more hours"
    ]
  },
  {
    key: "current_skincare_steps",
    q: "What best describes your current skincare routine?",
    opts: [
      "I don't have a skincare routine",
      "I use 1-2 basic steps (like face wash + cream)",
      "3-4 steps (includes serum or toner)",
      "Full 5+ step skincare routine",
      "Occasional use, not regular"
    ]
  },
  {
    key: "comfortable_routine_length",
    q: "How many skincare steps would you be comfortable with daily?",
    opts: [
      "1-2 steps",
      "3-4 steps",
      "5-6 steps",
      "More than 6 is fine",
      "Flexible depending on need"
    ]
  },
  {
    key: "food_preference",
    q: "What is your food preference?",
    opts: [
      "Vegetarian",
      "Eggetarian",
      "Non-vegetarian"
    ]
  },
  {
    key: "meal_type",
    q: "How would you describe your daily meals?",
    opts: [
      "Home-cooked and wholesome",
      "Mostly processed or packaged",
      "Mixed - some healthy, some fast food",
      "High in sugar or oil",
      "I skip meals often"
    ]
  },
  {
    key: "known_allergies",
    q: "Please specify any known skincare allergies or ingredients that cause reactions:",
    opts: null,
    note: "Common allergens include: fragrance, parabens, sulfates, retinoids, alpha/beta hydroxy acids, essential oils, alcohol, lanolin\n\nTip: Check ingredient lists of products that have caused reactions in the past"
  },
  {
    key: "side_effects_ingredients",
    q: "Have you experienced any side effects (itching, redness, breakouts) from certain ingredients?",
    opts: [
      "Yes, multiple times",
      "Yes, but only to specific ingredients",
      "Occasionally",
      "Never",
      "I haven't used enough products to know"
    ]
  }
];