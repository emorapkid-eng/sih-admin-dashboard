CREATE TABLE public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price INTEGER NOT NULL DEFAULT 0,
  description TEXT NOT NULL DEFAULT '',
  image TEXT NOT NULL DEFAULT '',
  is_new BOOLEAN NOT NULL DEFAULT false,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.products TO anon;
GRANT SELECT ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Products are publicly viewable" ON public.products FOR SELECT USING (true);

CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT NOT NULL,
  address TEXT NOT NULL,
  location TEXT,
  payment TEXT NOT NULL DEFAULT 'COD',
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  total INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER products_updated_at BEFORE UPDATE ON public.products
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.products (id, name, category, price, description, image, is_new, is_featured, sort_order) VALUES
('sh-01','Blue Motorsport Shirt','shirts',1600,'Heavyweight cotton shirt with a bold motorsport graphic. Built for everyday wear.','/__l5e/assets-v1/ffd39207-b6cb-4a40-bd52-ec9a94abcba7/sih-blue-motorsport-shirt.jpeg',true,false,1),
('sh-02','Red Dreamer Shirt','shirts',1600,'Soft-touch cotton tee with a striking red print.','/__l5e/assets-v1/78d807e3-c77c-4c4b-813b-d7b14a1ed3e4/sih-red-anime-shirt.jpeg',false,false,2),
('sh-03','Grey Mountain Shirt','shirts',1600,'Muted grey shirt with a clean mountain graphic.','/__l5e/assets-v1/9ad36099-c444-42d3-bced-267a3241d5f7/sih-grey-mountain-shirt.jpeg',false,false,3),
('sh-04','White Essential Shirt','shirts',1600,'The everyday white essential. Clean, breathable and durable.','/__l5e/assets-v1/7f1dbffa-50f3-4c98-9d9b-06b42d98d45c/sih-white-essential-shirt.jpeg',false,false,4),
('pt-01','Relaxed Fleece Pants','pants',3900,'Brushed fleece pants with a relaxed fit and tapered ankle.','/__l5e/assets-v1/be5eecbc-8dec-4aa6-a5c7-54f438179b3e/p-pants.jpg',false,true,5),
('pt-02','Tapered Utility Pants','pants',4700,'Durable utility pants with deep pockets and a tapered leg.','/__l5e/assets-v1/be5eecbc-8dec-4aa6-a5c7-54f438179b3e/p-pants.jpg',false,false,6),
('gd-01','Mono Wireless Buds','gadgets',6500,'Compact wireless earbuds with deep bass and all-day battery.','/__l5e/assets-v1/68aa8f52-2250-4408-99d4-14a2a7d1ef9d/p-gadget.jpg',true,false,7),
('gd-02','Matte Black Smartwatch','gadgets',8900,'Minimal smartwatch with fitness tracking and notifications.','/__l5e/assets-v1/68aa8f52-2250-4408-99d4-14a2a7d1ef9d/p-gadget.jpg',false,false,8),
('sg-01','Editorial Square Frames','sunglasses',3200,'Square frames with UV400 lenses and a lightweight build.','/__l5e/assets-v1/8595c964-24fa-40d7-81c3-0205c9a083be/p-sunglasses.jpg',false,true,9),
('sg-02','Shadow Line Sunglasses','sunglasses',3800,'Sleek shaded sunglasses for sharp, everyday looks.','/__l5e/assets-v1/8595c964-24fa-40d7-81c3-0205c9a083be/p-sunglasses.jpg',false,false,10);