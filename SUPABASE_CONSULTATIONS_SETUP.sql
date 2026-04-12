-- Create consultations table
create table if not exists consultations (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text not null,
  price text not null,
  category text,
  custom_id text,
  position integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table consultations enable row level security;

-- Create policies
-- Allow everyone to view consultations
create policy "Public consultations are viewable by everyone."
  on consultations for select
  using ( true );

-- Allow authenticated users (admins) to insert, update, and delete consultations
create policy "Authenticated users can insert consultations"
  on consultations for insert
  with check ( auth.role() = 'authenticated' );

create policy "Authenticated users can update consultations"
  on consultations for update
  using ( auth.role() = 'authenticated' );

create policy "Authenticated users can delete consultations"
  on consultations for delete
  using ( auth.role() = 'authenticated' );

-- Seed initial data
insert into consultations (name, description, price, category, custom_id, position)
values 
  ('Horoscope Analysis', 'A comprehensive analysis of your birth chart to provide insights into your personality, health, relationships, marriage, career, and financial gains etc.', '₹3,000 + 18% GST', 'horoscope', 'horoscope-analysis', 1),
  ('Varshaphala (Annual Forecast)', 'Detailed astrological guidance for one full year. This analysis utilizes your Janma Kundali  (parashari and jaimini systems) combined with your Varsha Kundali to predict yearly trends.', '₹6,000 + 18% GST', 'horoscope', 'varshaphala', 2),
  ('Muhurta Selection', 'Identification of the most auspicious moments for significant life events, including marriage, travel, Griha Pravesh, and business inaugurations.', '₹6,000 + 18% GST', 'muhurta', 'muhurta-selection', 3),
  ('Residential Vaastu Analysis', 'A detailed Vaastu report for your home with effective remedies to optimize energy flow, ensuring peace and prosperity.', '₹20 / sq. ft.+  18% GST', 'vastu', 'residential-Vaastu', 4),
  ('Commercial Vaastu Analysis', 'Specialized Vaastu assessment for offices, shops, or factories to identify remedies that remove obstacles and stimulate business growth.', '₹20 / sq. ft + 18% GST.', 'vastu', 'commercial-Vaastu', 5),
  ('Astrological (Karmic) Remedial Services', ' Vedic remedies includes Vaastu remedies , garha anusthaan(mantra , hawan ), panch tatwa treatment and yantra therapy', '₹20,000 + 18% GST', 'remedial', 'karmic-remedial', 6);
