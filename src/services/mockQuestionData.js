// Rich Mock Question Bank for NinetyPTE
export const MOCK_QUESTIONS = {
  'read-aloud': [
    {
      id: 'RA-1001',
      title: 'Global Climate & Renewable Transition',
      text: 'The transition towards renewable energy sources is not merely an environmental preference, but an economic imperative. Modern technological breakthroughs have substantially lowered the capital expenditure associated with photovoltaic solar arrays and offshore wind turbines, making clean electricity generation competitive against traditional fossil fuels.',
      prepTime: 35,
      recordTime: 40,
      difficulty: 'Hard',
      predicted: true,
      examFrequency: 'High (Appeared in Last 7 Days)',
      audioUrl: 'https://actions.google.com/sounds/v1/speech/man_speaking.ogg',
      expectedKeywords: ['transition', 'renewable', 'economic imperative', 'photovoltaic', 'expenditure'],
      sampleScore: {
        overall: 86,
        fluency: 88,
        pronunciation: 84,
        content: 87,
        missedWords: ['photovoltaic'],
        mispronounced: ['imperative']
      }
    },
    {
      id: 'RA-1002',
      title: 'Artificial Intelligence in Healthcare',
      text: 'Artificial intelligence is fundamentally revolutionizing medical diagnostics and therapeutic planning. Deep learning algorithms trained on massive repositories of radiologic imaging can now detect subtle malignant anomalies with an accuracy that frequently surpasses seasoned clinical practitioners.',
      prepTime: 35,
      recordTime: 40,
      difficulty: 'Medium',
      predicted: true,
      examFrequency: 'Very High',
      expectedKeywords: ['artificial intelligence', 'diagnostics', 'radiologic', 'anomalies', 'practitioners']
    },
    {
      id: 'RA-1003',
      title: 'Urban Architecture and Public Spaces',
      text: 'Metropolitan urban planners increasingly emphasize human-centric design in contemporary landscape development. Accessible pedestrian precincts, interconnected cycling corridors, and biodiverse municipal parks encourage social coherence while mitigating the adverse microclimatic effects of urban heat islands.',
      prepTime: 35,
      recordTime: 40,
      difficulty: 'Medium',
      predicted: false,
      examFrequency: 'Medium'
    }
  ],

  'repeat-sentence': [
    {
      id: 'RS-2001',
      title: 'University Library Assignment Policy',
      text: 'Students are requested to submit all completed assignments through the online portal before midnight.',
      prepTime: 3,
      recordTime: 15,
      difficulty: 'Medium',
      predicted: true,
      examFrequency: 'Very High',
      expectedKeywords: ['students', 'requested', 'submit', 'assignments', 'portal', 'midnight']
    },
    {
      id: 'RS-2002',
      title: 'Laboratory Safety Regulations',
      text: 'Protective laboratory coats and goggles must be worn during all chemical experiments.',
      prepTime: 3,
      recordTime: 15,
      difficulty: 'Easy',
      predicted: true,
      examFrequency: 'High'
    }
  ],

  'describe-image': [
    {
      id: 'DI-3001',
      title: 'Global Energy Consumption by Source (2015-2025)',
      type: 'Bar Chart',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      description: 'The given bar chart illustrates total global energy consumption broken down across oil, coal, natural gas, hydro, and renewables from 2015 to 2025.',
      prepTime: 25,
      recordTime: 40,
      difficulty: 'Medium',
      predicted: true,
      templateHint: 'The provided bar chart represents... The highest figure was observed in... In contrast, the lowest value was recorded for... In conclusion, an upward trend is visible.'
    }
  ],

  'summarize-written-text': [
    {
      id: 'SWT-4001',
      title: 'Biodiversity Loss and Agricultural Monoculture',
      text: 'The widespread adoption of monoculture agriculture over the past six decades has significantly transformed global food production systems. While mono-cropping maximizes immediate mechanical efficiency and short-term yields of staple grains such as maize and wheat, it simultaneously impoverishes soil microbiology, increases susceptibility to pest outbreaks, and decimates native pollinators. Consequently, farmers are forced to apply escalating quantities of synthetic agrochemicals to sustain output, sparking detrimental environmental feedback loops that compromise long-term ecological balance and aquifer purity.',
      timeLimit: 600,
      wordLimit: { min: 5, max: 75 },
      difficulty: 'Hard',
      predicted: true,
      modelSummary: 'Although monoculture agriculture enhances short-term crop efficiency, it severely degrades soil quality, depletes native pollinators, and escalates chemical reliance, thereby endangering long-term ecological and agricultural sustainability.'
    }
  ],

  'write-essay': [
    {
      id: 'WE-5001',
      title: 'Remote Work vs Traditional Office Environments',
      prompt: 'With rapid advancements in digital communication technology, remote working has become increasingly prevalent across multinational corporations. Do the advantages of flexible telecommuting outweigh its potential downsides for employees and organizations? Discuss both views and present your reasoned perspective.',
      timeLimit: 1200,
      wordLimit: { min: 200, max: 300 },
      difficulty: 'Medium',
      predicted: true,
      modelOutline: 'Introduction with thesis statement -> Body Paragraph 1: Flexibility, zero commute, global talent pool -> Body Paragraph 2: Diminished team bonding, home isolation, work-life blurring -> Conclusion summarizing stance.'
    }
  ],

  'fill-in-blanks-rw': [
    {
      id: 'FIB-RW-6001',
      title: 'Marine Ecosystems and Coral Bleaching',
      passage: 'Coral reefs harbor more than a quarter of all marine species despite occupying less than one percent of the ocean floor. When ocean temperatures rise excessively, corals experience severe physiological stress and [1] their symbiotic algae. Deprived of their primary nutrient supply, the corals turn bone white and become increasingly [2] to lethal bacterial infections. Without prompt thermal recovery, the structural framework [3] rapidly, leading to the collapse of complex underwater habitats.',
      options: {
        '1': ['expel', 'absorb', 'fertilize', 'ignite'],
        '2': ['invulnerable', 'vulnerable', 'immune', 'indifferent'],
        '3': ['deteriorates', 'flourishes', 'amplifies', 'stabilizes']
      },
      correctAnswers: {
        '1': 'expel',
        '2': 'vulnerable',
        '3': 'deteriorates'
      },
      difficulty: 'Hard',
      predicted: true
    }
  ],

  'write-from-dictation': [
    {
      id: 'WFD-7001',
      title: 'Economic Theory Seminar',
      sentence: 'The economic theory suggests that consumer confidence plays a pivotal role in market stability.',
      audioUrl: '',
      difficulty: 'Hard',
      predicted: true,
      examFrequency: 'Predicted #1 This Week',
      shardedDb: 'db_qb_listening'
    },
    {
      id: 'WFD-7002',
      title: 'University Registration Deadline',
      sentence: 'All prospective candidates must submit their application forms before the final deadline.',
      audioUrl: '',
      difficulty: 'Medium',
      predicted: true,
      examFrequency: 'High'
    }
  ]
};

export const getQuestionsByTaskId = (taskId) => {
  return MOCK_QUESTIONS[taskId] || [];
};
