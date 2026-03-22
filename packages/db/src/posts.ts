import { SupabaseClient } from '@supabase/supabase-js';
import type { PostRow, PostInsert, PostUpdate } from './types';

export class PostsRepository {
  constructor(private readonly db: SupabaseClient) {}

  async findAll(options?: { published?: boolean; authorId?: string }): Promise<PostRow[]> {
    let query = this.db.from('posts').select('*').order('created_at', { ascending: false });
    if (options?.published !== undefined) {
      query = query.eq('published', options.published);
    }
    if (options?.authorId) {
      query = query.eq('author_id', options.authorId);
    }
    const { data, error } = await query;
    if (error) throw new Error(`Failed to fetch posts: ${error.message}`);
    return data as PostRow[];
  }

  async findById(id: string): Promise<PostRow | null> {
    const { data, error } = await this.db
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();
    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new Error(`Failed to fetch post: ${error.message}`);
    }
    return data as PostRow;
  }

  async create(input: PostInsert): Promise<PostRow> {
    const { data, error } = await this.db
      .from('posts')
      .insert(input)
      .select()
      .single();
    if (error) throw new Error(`Failed to create post: ${error.message}`);
    return data as PostRow;
  }

  async update(id: string, input: PostUpdate): Promise<PostRow> {
    const { data, error } = await this.db
      .from('posts')
      .update({ ...input, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw new Error(`Failed to update post: ${error.message}`);
    return data as PostRow;
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.db.from('posts').delete().eq('id', id);
    if (error) throw new Error(`Failed to delete post: ${error.message}`);
  }

  async publish(id: string): Promise<PostRow> {
    return this.update(id, { published: true });
  }

  async unpublish(id: string): Promise<PostRow> {
    return this.update(id, { published: false });
  }
}
