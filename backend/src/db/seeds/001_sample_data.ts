/**
 * Sample Data Seed
 */

import { Knex } from 'knex';
import bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
  // Clear existing data (in correct order due to foreign keys)
  await knex('user_progress').del();
  await knex('hrv_sessions').del();
  await knex('symptom_entries').del();
  await knex('forum_votes').del();
  await knex('forum_comments').del();
  await knex('forum_posts').del();
  await knex('consultation_requests').del();
  await knex('learning_path_items').del();
  await knex('learning_paths').del();
  await knex('research_papers').del();
  await knex('content_articles').del();
  await knex('users').del();

  // Create users
  const hashedPassword = await bcrypt.hash('password123', 10);

  const [demoUser, practitioner, admin] = await knex('users')
    .insert([
      {
        open_id: 'demo_user_001',
        name: 'Demo User',
        email: 'demo@example.com',
        password: hashedPassword,
        role: 'user',
      },
      {
        open_id: 'practitioner_001',
        name: 'Dr. Sarah Johnson',
        email: 'sarah@neurofeedback-lux.com',
        password: hashedPassword,
        role: 'practitioner',
      },
      {
        open_id: 'admin_001',
        name: 'Admin',
        email: 'admin@neurofeedback-lux.com',
        password: hashedPassword,
        role: 'admin',
      },
    ])
    .returning('*');

  // Create content articles
  const articles = await knex('content_articles')
    .insert([
      {
        title: 'What is Photobiomodulation (PBM)?',
        slug: 'what-is-pbm',
        category: 'pbm',
        tags: ['basics', 'introduction', 'science'],
        content: `# What is Photobiomodulation?

Photobiomodulation (PBM) is a non-invasive treatment using specific wavelengths of light to stimulate biological processes in the body.

## How It Works
PBM delivers red or near-infrared light to tissues, where it's absorbed by cellular chromophores, particularly cytochrome c oxidase in mitochondria.

## Benefits
- Enhanced cognitive function
- Improved mood and reduced anxiety
- Better sleep quality
- Reduced pain and inflammation`,
        difficulty: 'beginner',
        read_time: 8,
        author_id: practitioner.id,
        published_at: new Date('2025-01-01'),
      },
      {
        title: 'Introduction to Neurofeedback',
        slug: 'introduction-to-neurofeedback',
        category: 'neurofeedback',
        tags: ['basics', 'brain training', 'qeeg'],
        content: `# Introduction to Neurofeedback

Neurofeedback is a non-invasive technique that teaches individuals to regulate their brain activity through real-time feedback.

## Applications
- Anxiety and depression
- ADHD and attention difficulties
- PTSD and trauma
- Peak performance training`,
        difficulty: 'beginner',
        read_time: 10,
        author_id: practitioner.id,
        published_at: new Date('2025-01-01'),
      },
      {
        title: 'Understanding the 365 Breathing Technique',
        slug: 'understanding-365-breathing',
        category: 'wellness',
        tags: ['breathing', 'hrv', 'coherence'],
        content: `# The 365 Breathing Technique

The 365 breathing method is a powerful tool for improving heart rate variability and coherence.

## The Pattern
- Inhale: 3 seconds
- Hold: 6 seconds
- Exhale: 5 seconds

## Benefits
- Increased HRV coherence
- Reduced stress and anxiety
- Improved focus and clarity`,
        difficulty: 'beginner',
        read_time: 5,
        author_id: practitioner.id,
        published_at: new Date('2025-01-02'),
      },
      {
        title: 'Vielight Neuro Duo 4: Complete Guide',
        slug: 'vielight-neuro-duo-4-guide',
        category: 'pbm',
        tags: ['vielight', 'devices', 'neuro'],
        content: `# Vielight Neuro Duo 4

The Neuro Duo 4 is an advanced transcranial-intranasal brain photobiomodulation device.

## Key Features
- 810nm and 1064nm wavelengths
- Microcontroller pulses at 10Hz (alpha wave)
- Intranasal + transcranial delivery
- 20-minute session protocol

## Clinical Applications
- Cognitive enhancement
- Mood improvement
- Neuroprotection
- Brain injury recovery`,
        difficulty: 'intermediate',
        read_time: 15,
        author_id: practitioner.id,
        published_at: new Date('2025-01-03'),
      },
      {
        title: 'Combining PBM with Neurofeedback: Synergistic Effects',
        slug: 'pbm-neurofeedback-synergy',
        category: 'research',
        tags: ['research', 'synergy', 'protocols'],
        content: `# PBM and Neurofeedback Synergy

Research suggests combining photobiomodulation with neurofeedback can enhance outcomes.

## Mechanisms
1. PBM increases cellular ATP production
2. Enhanced brain metabolism supports neuroplasticity
3. Neurofeedback trains specific brain patterns
4. Combined effect accelerates brain optimization

## Research Findings
Studies show 30-40% improvement when combining therapies vs. single modality treatment.`,
        difficulty: 'advanced',
        read_time: 12,
        author_id: practitioner.id,
        published_at: new Date('2025-01-04'),
      },
    ])
    .returning('*');

  // Create research papers
  await knex('research_papers').insert([
    {
      title: 'Transcranial Photobiomodulation for Brain Disorders',
      authors: ['Michael R. Hamblin'],
      year: 2016,
      journal: 'BBA Clinical',
      pdf_url: 'https://example.com/papers/hamblin-2016.pdf',
      file_key: 'hamblin-2016-pbm-brain',
      summary:
        'Comprehensive review of transcranial PBM applications for various brain disorders including depression, anxiety, and cognitive decline.',
      keywords: ['transcranial', 'brain disorders', 'depression', 'anxiety'],
      category: 'pbm',
    },
    {
      title: 'Brain Photobiomodulation Therapy: A Narrative Review',
      authors: ['Farzad Salehpour', 'Javad Mahmoudi', 'et al.'],
      year: 2018,
      journal: 'Molecular Neurobiology',
      pdf_url: 'https://example.com/papers/salehpour-2018.pdf',
      file_key: 'salehpour-2018-pbm-review',
      summary:
        'Narrative review of brain PBM therapy mechanisms, safety, and clinical applications.',
      keywords: ['photobiomodulation', 'brain', 'neuroprotection', 'review'],
      category: 'pbm',
    },
  ]);

  // Create learning path
  const [learningPath] = await knex('learning_paths')
    .insert({
      title: 'PBM Fundamentals',
      description: 'Learn the basics of photobiomodulation therapy',
      difficulty: 'beginner',
      estimated_hours: 2,
    })
    .returning('*');

  await knex('learning_path_items').insert([
    {
      path_id: learningPath.id,
      article_id: articles[0].id,
      order: 1,
      required: true,
    },
    {
      path_id: learningPath.id,
      article_id: articles[3].id,
      order: 2,
      required: true,
    },
  ]);

  // Create HRV sessions for demo user
  const now = new Date();
  for (let i = 0; i < 10; i++) {
    const sessionDate = new Date(now);
    sessionDate.setDate(sessionDate.getDate() - i);

    await knex('hrv_sessions').insert({
      user_id: demoUser.id,
      duration: 300, // 5 minutes
      avg_heart_rate: 65 + Math.random() * 10,
      coherence_score: 60 + Math.random() * 30,
      breathing_rate: 5 + Math.random() * 2,
      session_date: sessionDate,
    });
  }

  // Create symptom entries
  for (let i = 0; i < 7; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    await knex('symptom_entries').insert({
      user_id: demoUser.id,
      date: date.toISOString().split('T')[0],
      mood: Math.floor(5 + Math.random() * 5),
      energy: Math.floor(5 + Math.random() * 5),
      notes: i === 0 ? 'Feeling great after HRV session!' : null,
    });
  }

  // Create forum post
  const [forumPost] = await knex('forum_posts')
    .insert({
      user_id: demoUser.id,
      title: 'New to PBM - Questions about Vielight devices',
      content: `Hi everyone! I'm new to photobiomodulation and considering purchasing a Vielight device.

I've been doing neurofeedback for 3 months and my practitioner recommended adding PBM. Has anyone here combined both therapies? What were your results?

Also, should I start with the Neuro or the Vagus device?`,
      category: 'questions',
    })
    .returning('*');

  // Create forum comment
  await knex('forum_comments').insert({
    post_id: forumPost.id,
    user_id: practitioner.id,
    content: `Welcome! Great question. I typically recommend starting with the Neuro Duo 4 if cognitive enhancement is your primary goal. The combination with neurofeedback can be very powerful.

The Vagus is excellent for stress and autonomic regulation. Many of my clients use both!`,
    is_best_answer: true,
  });

  // Create consultation request
  await knex('consultation_requests').insert({
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+352 123 456 789',
    interest: 'pbm_therapy',
    message: 'Interested in learning more about PBM for anxiety and sleep issues.',
    status: 'new',
    source: 'website',
  });

  console.log('✅ Sample data seeded successfully!');
  console.log('');
  console.log('Demo credentials:');
  console.log('  Email: demo@example.com');
  console.log('  Password: password123');
  console.log('');
  console.log('Practitioner credentials:');
  console.log('  Email: sarah@neurofeedback-lux.com');
  console.log('  Password: password123');
}
