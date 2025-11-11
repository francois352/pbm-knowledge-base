/**
 * Initial Database Schema Migration
 */

import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Users table
  await knex.schema.createTable('users', table => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('open_id').notNullable().unique();
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.enum('role', ['user', 'practitioner', 'admin']).defaultTo('user');
    table.jsonb('preferences').defaultTo('{}');
    table.timestamps(true, true);
  });

  // Content Articles table
  await knex.schema.createTable('content_articles', table => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('title').notNullable();
    table.string('slug').notNullable().unique();
    table.enum('category', ['neurofeedback', 'pbm', 'wellness', 'research']).notNullable();
    table.specificType('tags', 'text[]').defaultTo('{}');
    table.text('content').notNullable();
    table.enum('difficulty', ['beginner', 'intermediate', 'advanced']).defaultTo('beginner');
    table.integer('read_time').notNullable(); // minutes
    table.uuid('author_id').references('id').inTable('users').onDelete('SET NULL');
    table.timestamp('published_at');
    table.timestamps(true, true);
    table.index(['category', 'published_at']);
    table.index('slug');
  });

  // Research Papers table
  await knex.schema.createTable('research_papers', table => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('title').notNullable();
    table.specificType('authors', 'text[]').notNullable();
    table.integer('year').notNullable();
    table.string('journal');
    table.string('pdf_url').notNullable();
    table.string('file_key').notNullable();
    table.text('summary');
    table.specificType('keywords', 'text[]').defaultTo('{}');
    table.enum('category', ['neurofeedback', 'pbm', 'wellness', 'research']).notNullable();
    table.timestamps(true, true);
    table.index(['category', 'year']);
  });

  // Learning Paths table
  await knex.schema.createTable('learning_paths', table => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('title').notNullable();
    table.text('description').notNullable();
    table.enum('difficulty', ['beginner', 'intermediate', 'advanced']).defaultTo('beginner');
    table.integer('estimated_hours').notNullable();
    table.timestamps(true, true);
  });

  // Learning Path Items table
  await knex.schema.createTable('learning_path_items', table => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('path_id').references('id').inTable('learning_paths').onDelete('CASCADE');
    table.uuid('article_id').references('id').inTable('content_articles').onDelete('CASCADE');
    table.integer('order').notNullable();
    table.boolean('required').defaultTo(true);
    table.unique(['path_id', 'article_id']);
    table.index(['path_id', 'order']);
  });

  // User Progress table
  await knex.schema.createTable('user_progress', table => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.uuid('article_id').references('id').inTable('content_articles').onDelete('CASCADE');
    table.boolean('completed').defaultTo(false);
    table.timestamp('completed_at');
    table.integer('time_spent').defaultTo(0); // seconds
    table.timestamps(true, true);
    table.unique(['user_id', 'article_id']);
    table.index(['user_id', 'completed']);
  });

  // HRV Sessions table
  await knex.schema.createTable('hrv_sessions', table => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.integer('duration').notNullable(); // seconds
    table.decimal('avg_heart_rate', 5, 2).notNullable();
    table.decimal('coherence_score', 5, 2).notNullable();
    table.decimal('breathing_rate', 5, 2).notNullable();
    table.timestamp('session_date').notNullable();
    table.jsonb('raw_data');
    table.timestamps(true, true);
    table.index(['user_id', 'session_date']);
  });

  // Symptom Entries table
  await knex.schema.createTable('symptom_entries', table => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.date('date').notNullable();
    table.integer('mood').notNullable(); // 1-10
    table.integer('energy').notNullable(); // 1-10
    table.text('notes');
    table.jsonb('symptoms');
    table.timestamps(true, true);
    table.unique(['user_id', 'date']);
    table.index(['user_id', 'date']);
  });

  // Forum Posts table
  await knex.schema.createTable('forum_posts', table => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.string('title').notNullable();
    table.text('content').notNullable();
    table
      .enum('category', ['general', 'questions', 'experiences', 'research', 'practitioners'])
      .defaultTo('general');
    table.boolean('is_pinned').defaultTo(false);
    table.boolean('is_locked').defaultTo(false);
    table.integer('view_count').defaultTo(0);
    table.timestamps(true, true);
    table.index(['category', 'created_at']);
    table.index(['is_pinned', 'created_at']);
  });

  // Forum Comments table
  await knex.schema.createTable('forum_comments', table => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('post_id').references('id').inTable('forum_posts').onDelete('CASCADE');
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.uuid('parent_id').references('id').inTable('forum_comments').onDelete('CASCADE');
    table.text('content').notNullable();
    table.boolean('is_best_answer').defaultTo(false);
    table.timestamps(true, true);
    table.index(['post_id', 'created_at']);
    table.index(['parent_id', 'created_at']);
  });

  // Forum Votes table
  await knex.schema.createTable('forum_votes', table => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('post_id').references('id').inTable('forum_posts').onDelete('CASCADE');
    table.uuid('comment_id').references('id').inTable('forum_comments').onDelete('CASCADE');
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.enum('vote_type', ['upvote', 'downvote']).notNullable();
    table.timestamps(true, true);
    table.unique(['post_id', 'user_id']);
    table.unique(['comment_id', 'user_id']);
    table.index('user_id');
  });

  // Consultation Requests table
  await knex.schema.createTable('consultation_requests', table => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('phone').notNullable();
    table
      .enum('interest', [
        'neurofeedback',
        'pbm_therapy',
        'vielight_devices',
        'wellness_program',
        'qeeg_assessment',
        'other',
      ])
      .notNullable();
    table.text('message').notNullable();
    table
      .enum('status', ['new', 'contacted', 'qualified', 'converted', 'declined'])
      .defaultTo('new');
    table.string('source');
    table.jsonb('utm_params');
    table.text('notes');
    table.timestamp('contacted_at');
    table.timestamp('converted_at');
    table.timestamps(true, true);
    table.index(['status', 'created_at']);
    table.index('email');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('consultation_requests');
  await knex.schema.dropTableIfExists('forum_votes');
  await knex.schema.dropTableIfExists('forum_comments');
  await knex.schema.dropTableIfExists('forum_posts');
  await knex.schema.dropTableIfExists('symptom_entries');
  await knex.schema.dropTableIfExists('hrv_sessions');
  await knex.schema.dropTableIfExists('user_progress');
  await knex.schema.dropTableIfExists('learning_path_items');
  await knex.schema.dropTableIfExists('learning_paths');
  await knex.schema.dropTableIfExists('research_papers');
  await knex.schema.dropTableIfExists('content_articles');
  await knex.schema.dropTableIfExists('users');
}
