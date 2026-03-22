import { SupabaseClient } from '@supabase/supabase-js';
import type { UserRow, UserInsert, UserUpdate } from './types';

export class UsersRepository {
  constructor(private readonly db: SupabaseClient) {}

  async findAll(): Promise<UserRow[]> {
    const { data, error } = await this.db.from('users').select('*').order('created_at', {
      ascending: false,
    });
    if (error) throw new Error(`Failed to fetch users: ${error.message}`);
    return data as UserRow[];
  }

  async findById(id: string): Promise<UserRow | null> {
    const { data, error } = await this.db
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new Error(`Failed to fetch user: ${error.message}`);
    }
    return data as UserRow;
  }

  async findByEmail(email: string): Promise<UserRow | null> {
    const { data, error } = await this.db
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new Error(`Failed to fetch user by email: ${error.message}`);
    }
    return data as UserRow;
  }

  async create(input: UserInsert): Promise<UserRow> {
    const { data, error } = await this.db
      .from('users')
      .insert(input)
      .select()
      .single();
    if (error) throw new Error(`Failed to create user: ${error.message}`);
    return data as UserRow;
  }

  async update(id: string, input: UserUpdate): Promise<UserRow> {
    const { data, error } = await this.db
      .from('users')
      .update({ ...input, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw new Error(`Failed to update user: ${error.message}`);
    return data as UserRow;
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.db.from('users').delete().eq('id', id);
    if (error) throw new Error(`Failed to delete user: ${error.message}`);
  }
}
