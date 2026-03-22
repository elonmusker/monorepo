import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, InsertDto, UpdateDto } from "./types";

type TableName = keyof Database["public"]["Tables"];

export async function findMany<T extends TableName>(
  client: SupabaseClient<Database>,
  table: T
) {
  const { data, error } = await client.from(table).select("*");
  if (error) throw error;
  return data;
}

export async function findById<T extends TableName>(
  client: SupabaseClient<Database>,
  table: T,
  id: string
) {
  const { data, error } = await client
    .from(table)
    .select("*")
    .eq("id" as never, id as never)
    .single();
  if (error) throw error;
  return data;
}

export async function create<T extends TableName>(
  client: SupabaseClient<Database>,
  table: T,
  values: InsertDto<T>
) {
  const { data, error } = await client
    .from(table)
    .insert(values as never)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function update<T extends TableName>(
  client: SupabaseClient<Database>,
  table: T,
  id: string,
  values: UpdateDto<T>
) {
  const { data, error } = await client
    .from(table)
    .update(values as never)
    .eq("id" as never, id as never)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function remove<T extends TableName>(
  client: SupabaseClient<Database>,
  table: T,
  id: string
) {
  const { error } = await client
    .from(table)
    .delete()
    .eq("id" as never, id as never);
  if (error) throw error;
}
