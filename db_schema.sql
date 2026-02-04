-- 1. Profiles Table (Extends Supabase Auth)
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  name text,
  avatar_url text,
  role text default 'user' check (role in ('admin', 'user'))
);

-- 2. Categories Table
create table categories (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  parent_id uuid references categories(id),
  icon text
);

-- 3. Articles Table
create table articles (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  content text,
  category_id uuid references categories(id),
  author_email text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 4. Enable RLS
alter table profiles enable row level security;
alter table articles enable row level security;
alter table categories enable row level security;

-- 5. Policies
-- Everyone can read articles/categories
create policy "Public articles are viewable by everyone" on articles for select using (true);
create policy "Public categories are viewable by everyone" on categories for select using (true);

-- Only Admins can insert/update/delete (This relies on a trigger or manual role setting)
-- For simplicity in this template, we assume role is managed in profiles.
create policy "Admins can manage articles" on articles for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- Initial Data
insert into categories (name, icon) values ('Domů', 'Home'), ('Interní Systémy', 'Server'), ('Nástroje', 'Wrench');
