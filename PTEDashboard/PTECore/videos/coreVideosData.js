import { hydrateStrategyVideo } from '../../shared/videos/videoUtils';

const RAW_CORE_TUTORIALS = [
  ['PTE Academic & Core Exam Experience | What to Expect (Real Talk)', '2 months ago', 'ACADEMIC & CORE WHAT TO EXPECT', 'Exam Guide', '13:35'],
  ['PTE Core vs PTE Academic: Honest Difficulty Comparison', 'a year ago', 'CORE vs ACADEMIC COMPARISON', 'Comparison', '11:48'],
  ['PTE Core: Summarize Written Text Made Easy | Expert Tips & Real Examples', 'a year ago', 'CORE SUMMARIZE WRITTEN TEXT', 'Writing', '10:32'],
  ['PTE Core vs Academic: How the Scoring Differs in Each Test', 'a year ago', 'HOW SCORING DIFFERS', 'Scoring', '12:15'],
  ['Stop Losing Marks in PTE Read Alouds - Easy Techniques for Core & Academic', 'a year ago', 'READ ALOUD TECHNIQUES', 'Speaking', '09:54'],
  ['How to Write an Informal Email in PTE Core | Step-by-Step Guide with Example', 'a year ago', 'INFORMAL EMAIL GUIDE', 'Writing', '14:20'],
  ['Big News for PTE Test Takers | NinetyPTE Mock Tests with Real Exam Interface', 'a year ago', 'REAL EXAM INTERFACE', 'Mock Tests', '08:42'],
  ['Week 1: A 30-Day Plan to PTE Success for Beginners', '2 years ago', 'WEEK 1 · 30-DAY PLAN', 'Study Plan', '15:10'],
  ['Create Your Own PTE Mock Test on NinetyPTE', '2 years ago', 'CUSTOM PTE MOCK TEST', 'Mock Tests', '07:55'],
  ['PTE Repeat Sentence Tips and Tricks For 90 Score in 2025', '2 years ago', 'REPEAT SENTENCE 90/90', 'Speaking', '11:08'],
  ['PTE Exam Preparation Secrets from NinetyPTE Experts', '2 years ago', 'EXPERT PREP SECRETS', 'Strategy', '13:24'],
  ['PTE Core Summarize Spoken Text | Tips and Template | 100% Tried & Tested', '2 years ago', 'CORE SST TEMPLATE', 'Listening', '10:45'],
  ['How to Set Headphone Microphone in PTE Exam | NinetyPTE', '2 years ago', 'HEADPHONE MIC SETUP', 'Exam Tips', '06:50'],
  ['How To Pass PTE Exam Easily in First Attempt Secret Tips and Tricks | NinetyPTE', '2 years ago', 'PASS IN FIRST ATTEMPT', 'Strategy', '14:05'],
  ['Easiest Way to Solve Summarize Spoken Text PTE | NinetyPTE', '2 years ago', 'EASIEST WAY TO SST', 'Listening', '09:40'],
  ['How to do Time Management for the Listening Section Hindi Language | NinetyPTE', '2 years ago', 'LISTENING TIME MANAGEMENT', 'Listening', '11:32'],
  ['5 Expert Tips to Ace Your Speaking | NinetyPTE', '2 years ago', '5 EASY TRICKS · SPEAKING 90/90', 'Speaking', '12:18'],
  ['PTE Exam Introduction - Exam Preparation | NinetyPTE', '2 years ago', 'PTE EXAM INTRODUCTION', 'Beginners', '10:02'],
  ['PTE Scoring and Exam Structure - Exam Pattern & Simple Tricks to 90 Score | NinetyPTE', '2 years ago', 'PTE EXAM PATTERN · 90 SCORE', 'Exam Pattern', '16:28'],
  ['Do PTE Templates Still Work Shocking Truth Revealed! | NinetyPTE', '2 years ago', 'TEMPLATES & STRATEGIES', 'Strategy', '11:50'],
  ['5 Expert Tips to Ace Your Listening in PTE Exam | NinetyPTE', '2 years ago', 'PTE LISTENING HACKS 90/90', 'Listening', '13:12'],
  ['5 Expert Tips to Ace Your Writing | NinetyPTE', '2 years ago', '5 SECRET TRICKS · PTE WRITING', 'Writing', '12:44'],
  ['5 Expert Tips to Ace Your Reading | NinetyPTE', '2 years ago', '5 EXPERT TIPS · PTE READING', 'Reading', '11:25'],
  ['5 Easy Tips & Tricks to Get 90 in PTE Exam | NinetyPTE', '2 years ago', '5 TIPS TO GET 90 IN PTE', 'Master Plan', '14:50'],
  ['My Latest PTE Exam Experience - November 2024 Tips to Boost Your Score | NinetyPTE', '2 years ago', 'EXAM EXPERIENCE · NOV 2024', 'Exam Review', '10:36'],
  ['100% Working PTE Study Plan For 50+ Score How To Start PTE Preparation | NinetyPTE', '2 years ago', 'PTE STUDY PLAN FOR 50+ SCORE', 'Study Plan', '12:55'],
];

export const CORE_STRATEGY_VIDEOS_BY_PAGE = {
  1: RAW_CORE_TUTORIALS.map((item, idx) => hydrateStrategyVideo(item, idx, 'core-vid')),
};
