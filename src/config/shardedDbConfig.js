/**
 * Hostinger Sharded Database Architecture Configuration
 * Designed specifically for Hostinger Shared MySQL limits:
 * - 10+ distinct databases
 * - Max 3GB per individual database
 * - Dynamic domain-based routing & connection pooling
 */

export const HOSTINGER_SHARDED_DB_CONFIG = {
  version: '1.0.0',
  provider: 'Hostinger Shared Hosting (MySQL)',
  databaseQuotaMb: 3072, // 3 GB per DB
  totalDatabases: 10,

  databases: {
    // DB 1: Authentication, User Profiles, Subscriptions & System Config
    db_core_auth: {
      dbId: 1,
      name: 'u123456_ninetypte_auth',
      purpose: 'Core identity, user credentials, JWT sessions, subscription tiers, payment invoices',
      estimatedSizeMb: 850,
      tables: ['users', 'user_profiles', 'subscriptions', 'invoices', 'system_settings', 'roles_permissions']
    },

    // DB 2: Speaking Question Bank & Metadata
    db_qb_speaking: {
      dbId: 2,
      name: 'u123456_ninetypte_qb_speaking',
      purpose: 'Questions for RA, RS, DI, RL, ASQ, RTS with reference audio links, model transcripts, keywords',
      estimatedSizeMb: 1800,
      tables: ['speaking_questions', 'speaking_tags', 'model_answers', 'exam_predictions_speaking']
    },

    // DB 3: Writing Question Bank & Model Responses
    db_qb_writing: {
      dbId: 3,
      name: 'u123456_ninetypte_qb_writing',
      purpose: 'Questions for SWT, WE, WEM, essay templates, sample band-9 responses, grammar rules',
      estimatedSizeMb: 1200,
      tables: ['writing_questions', 'writing_templates', 'band9_samples', 'scoring_rubrics']
    },

    // DB 4: Reading Question Bank & Passages
    db_qb_reading: {
      dbId: 4,
      name: 'u123456_ninetypte_qb_reading',
      purpose: 'Questions for FIB-RW, FIB-R, RO, MCSA, MCMA, passages, collocations pool, option dictionaries',
      estimatedSizeMb: 1600,
      tables: ['reading_passages', 'reading_questions', 'reorder_chunks', 'collocation_dictionary']
    },

    // DB 5: Listening Question Bank & Audio Transcripts
    db_qb_listening: {
      dbId: 5,
      name: 'u123456_ninetypte_qb_listening',
      purpose: 'Questions for SST, WFD, HIW, FIB-L, SMW, HCS, audio stream metadata, exact timestamps',
      estimatedSizeMb: 2100,
      tables: ['listening_questions', 'audio_meta', 'transcripts', 'wfd_frequency_list']
    },

    // DB 6: User Practice Attempts & AI Scores (Shard A - User IDs 1 to 50,000)
    db_attempts_shard_1: {
      dbId: 6,
      name: 'u123456_ninetypte_attempts_1',
      purpose: 'User attempt recordings, speech-to-text outputs, AI scores (Users 1..50000)',
      estimatedSizeMb: 2600,
      tables: ['practice_attempts', 'ai_scores_breakdown', 'user_answers', 'audio_recordings_meta']
    },

    // DB 7: User Practice Attempts & AI Scores (Shard B - User IDs 50,001 to 100,000+)
    db_attempts_shard_2: {
      dbId: 7,
      name: 'u123456_ninetypte_attempts_2',
      purpose: 'User attempt recordings, speech-to-text outputs, AI scores (Users 50001..100000+)',
      estimatedSizeMb: 2600,
      tables: ['practice_attempts', 'ai_scores_breakdown', 'user_answers', 'audio_recordings_meta']
    },

    // DB 8: Mock Tests & Full Pearson Exam Simulations
    db_mock_tests: {
      dbId: 8,
      name: 'u123456_ninetypte_mock_tests',
      purpose: 'Full 2-hour mock test bundles, sectional tests, completed scorecards, percentile rankings',
      estimatedSizeMb: 1950,
      tables: ['mock_test_templates', 'mock_test_sessions', 'mock_scorecards', 'enabling_skills_scores']
    },

    // DB 9: Study Tools, Vocab Bank, MP3 Streams & Streaks
    db_tools_analytics: {
      dbId: 9,
      name: 'u123456_ninetypte_tools_analytics',
      purpose: 'Vocabulary bookmarks, MP3 practice lists, daily study planner, daily login streaks',
      estimatedSizeMb: 1400,
      tables: ['vocab_bookmarks', 'mp3_playlists', 'study_plans', 'daily_streaks', 'user_activity_logs']
    },

    // DB 10: Community Forum, Question Comments & Upvotes
    db_community_forum: {
      dbId: 10,
      name: 'u123456_ninetypte_community',
      purpose: 'Question discussion threads, student tips, upvotes, moderation reports, study groups',
      estimatedSizeMb: 1100,
      tables: ['question_comments', 'comment_upvotes', 'forum_topics', 'forum_replies']
    }
  },

  /**
   * Helper function that resolves which database shard handles a specific request.
   */
  resolveDbShard(moduleKey, userId = null) {
    if (['users', 'auth', 'subscription', 'billing'].includes(moduleKey)) {
      return this.databases.db_core_auth;
    }
    if (['speaking'].includes(moduleKey)) return this.databases.db_qb_speaking;
    if (['writing'].includes(moduleKey)) return this.databases.db_qb_writing;
    if (['reading'].includes(moduleKey)) return this.databases.db_qb_reading;
    if (['listening'].includes(moduleKey)) return this.databases.db_qb_listening;

    if (moduleKey === 'practice_attempt') {
      if (!userId || userId <= 50000) return this.databases.db_attempts_shard_1;
      return this.databases.db_attempts_shard_2;
    }

    if (['mock_tests', 'exam_simulation'].includes(moduleKey)) {
      return this.databases.db_mock_tests;
    }
    if (['vocab', 'mp3', 'streaks', 'study_plan'].includes(moduleKey)) {
      return this.databases.db_tools_analytics;
    }
    if (['comments', 'forum'].includes(moduleKey)) {
      return this.databases.db_community_forum;
    }

    return this.databases.db_core_auth;
  }
};
