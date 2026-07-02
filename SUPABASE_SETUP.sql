-- Run this entire file in Supabase SQL Editor before launching

-- 1. Profiles table
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  created_at timestamp with time zone default timezone('utc', now()),
  username text unique not null,
  full_name text,
  bio text,
  avatar_url text,
  show_love_label text default 'Send Me a Gift',
  show_love_slug text default 'gift',
  show_love_active boolean default false
);

-- 2. Products table
create table if not exists products (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc', now()),
  creator_id uuid references profiles(id) on delete cascade,
  title text not null,
  description text,
  price numeric not null,
  file_url text,
  is_active boolean default true
);

-- 3. Transactions table
create table if not exists transactions (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc', now()),
  creator_id uuid references profiles(id) on delete cascade,
  buyer_email text,
  amount numeric not null,
  type text not null,
  status text default 'completed',
  product_id uuid references products(id) on delete set null,
  message text
);

-- 4. Enable RLS
alter table profiles enable row level security;
alter table products enable row level security;
alter table transactions enable row level security;

-- 5. Profiles policies
drop policy if exists "profiles_select" on profiles;
drop policy if exists "profiles_insert" on profiles;
drop policy if exists "profiles_update" on profiles;

create policy "profiles_select" on profiles for select using (true);
create policy "profiles_insert" on profiles for insert to authenticated with check (auth.uid() = id);
create policy "profiles_update" on profiles for update using (auth.uid() = id);

-- 6. Products policies
drop policy if exists "products_select" on products;
drop policy if exists "products_manage" on products;

create policy "products_select" on products for select using (true);
create policy "products_manage" on products for all using (auth.uid() = creator_id);

-- 7. Transactions policies
drop policy if exists "transactions_select" on transactions;
drop policy if exists "transactions_insert" on transactions;

create policy "transactions_select" on transactions for select using (auth.uid() = creator_id);
create policy "transactions_insert" on transactions for insert with check (true);

-- 8. Grants
grant usage on schema public to anon, authenticated;
grant all on profiles to anon, authenticated;
grant all on products to anon, authenticated;
grant all on transactions to anon, authenticated;

-- 9. Auto-create profile trigger
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, username)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'username'
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
