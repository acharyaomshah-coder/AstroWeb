-- Create courses table
create table if not exists courses (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  price numeric not null,
  thumbnail text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table courses enable row level security;

-- Create policies
-- Allow everyone to view courses
create policy "Public courses are viewable by everyone."
  on courses for select
  using ( true );

-- Allow authenticated users (admins) to insert, update, and delete courses
-- Note: You can refine this to specific user IDs if needed
create policy "Authenticated users can insert courses"
  on courses for insert
  with check ( auth.role() = 'authenticated' );

create policy "Authenticated users can update courses"
  on courses for update
  using ( auth.role() = 'authenticated' );

create policy "Authenticated users can delete courses"
  on courses for delete
  using ( auth.role() = 'authenticated' );

-- Ensure 'images' bucket exists for thumbnails (if not already created)
insert into storage.buckets (id, name, public)
values ('images', 'images', true)
on conflict (id) do nothing;

-- Storage policies for images
create policy "Images are publicly accessible."
  on storage.objects for select
  using ( bucket_id = 'images' );

create policy "Authenticated users can upload images."
  on storage.objects for insert
  with check ( bucket_id = 'images' and auth.role() = 'authenticated' );

create policy "Authenticated users can update images."
  on storage.objects for update
  with check ( bucket_id = 'images' and auth.role() = 'authenticated' );

create policy "Authenticated users can delete images."
  on storage.objects for delete
  using ( bucket_id = 'images' and auth.role() = 'authenticated' );
