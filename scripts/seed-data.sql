-- Insert sample collections
INSERT INTO collections (title, photographer, caption, grade, category, date, likes)
VALUES 
  ('Rainforest Expedition', ARRAY['John D.', 'Sara T.', 'Mike R.'], 'A glimpse into jungle life — from explorers to wildlife. This collection showcases the incredible biodiversity and natural beauty of tropical rainforests around the world.', 9, 'Nature', '2024-03-15', 234),
  ('Urban Architecture', ARRAY['Alex M.', 'Emma K.'], 'Modern cityscapes and architectural marvels captured in stunning detail. Exploring the intersection of design, functionality, and urban living.', 8, 'Architecture', '2024-03-10', 189),
  ('Ocean Depths', ARRAY['David L.', 'Maria S.', 'Tom W.'], 'Underwater photography showcasing marine life in its natural habitat. A journey into the mysterious and beautiful world beneath the waves.', 10, 'Marine', '2024-03-05', 312),
  ('Mountain Peaks', ARRAY['Lisa R.', 'James H.'], 'Breathtaking views from the world''s highest peaks and alpine landscapes. Capturing the raw beauty and majesty of mountain environments.', 7, 'Landscape', '2024-02-28', 267),
  ('Street Photography', ARRAY['Carlos R.', 'Nina P.'], 'Candid moments and urban life captured through the lens. Stories of everyday people and the rhythm of city life.', 6, 'Street', '2024-02-20', 156);

-- Insert sample images for Rainforest Expedition
INSERT INTO images (collection_id, url, alt_text, order)
VALUES 
  (1, 'https://storage.googleapis.com/a1aa/image/6d0350ab-05bb-4acb-1c1d-0dcecb887b36.jpg', 'Man in red jacket and hat looking at waterfall and rocks', 1),
  (1, 'https://storage.googleapis.com/a1aa/image/2832d8bd-066c-49bb-b02e-ad65fd66b76a.jpg', 'Waterfall in forest with rocks', 2),
  (1, 'https://storage.googleapis.com/a1aa/image/6ece2fbb-2014-4f7a-019b-0807895fb2a2.jpg', 'Man lying on grass in forest', 3),
  (1, 'https://storage.googleapis.com/a1aa/image/97fc85ad-fb31-4625-a494-4c2d509b75ed.jpg', 'Man in red jacket and hat in forest', 4),
  (1, 'https://storage.googleapis.com/a1aa/image/ff7490fe-43ce-4991-c390-fc3f0299589d.jpg', 'Yellow and black snake on branch', 5);

-- Insert sample images for Urban Architecture
INSERT INTO images (collection_id, url, alt_text, order)
VALUES 
  (2, 'https://storage.googleapis.com/a1aa/image/6d0350ab-05bb-4acb-1c1d-0dcecb887b36.jpg', 'Modern skyscraper with glass facade', 1),
  (2, 'https://storage.googleapis.com/a1aa/image/2832d8bd-066c-49bb-b02e-ad65fd66b76a.jpg', 'Urban street with historic buildings', 2),
  (2, 'https://storage.googleapis.com/a1aa/image/6ece2fbb-2014-4f7a-019b-0807895fb2a2.jpg', 'Contemporary museum interior', 3),
  (2, 'https://storage.googleapis.com/a1aa/image/97fc85ad-fb31-4625-a494-4c2d509b75ed.jpg', 'Geometric patterns in modern architecture', 4),
  (2, 'https://storage.googleapis.com/a1aa/image/ff7490fe-43ce-4991-c390-fc3f0299589d.jpg', 'City skyline at sunset', 5);

-- Insert sample images for Ocean Depths
INSERT INTO images (collection_id, url, alt_text, order)
VALUES 
  (3, 'https://storage.googleapis.com/a1aa/image/6d0350ab-05bb-4acb-1c1d-0dcecb887b36.jpg', 'Coral reef with colorful fish', 1),
  (3, 'https://storage.googleapis.com/a1aa/image/2832d8bd-066c-49bb-b02e-ad65fd66b76a.jpg', 'Sea turtle swimming in blue water', 2),
  (3, 'https://storage.googleapis.com/a1aa/image/6ece2fbb-2014-4f7a-019b-0807895fb2a2.jpg', 'Underwater cave with light beams', 3),
  (3, 'https://storage.googleapis.com/a1aa/image/97fc85ad-fb31-4625-a494-4c2d509b75ed.jpg', 'School of tropical fish', 4),
  (3, 'https://storage.googleapis.com/a1aa/image/ff7490fe-43ce-4991-c390-fc3f0299589d.jpg', 'Diver exploring shipwreck', 5);

-- Insert sample images for Mountain Peaks
INSERT INTO images (collection_id, url, alt_text, order)
VALUES 
  (4, 'https://storage.googleapis.com/a1aa/image/6d0350ab-05bb-4acb-1c1d-0dcecb887b36.jpg', 'Snow-capped mountain peak at sunrise', 1),
  (4, 'https://storage.googleapis.com/a1aa/image/2832d8bd-066c-49bb-b02e-ad65fd66b76a.jpg', 'Alpine lake with mountain reflection', 2),
  (4, 'https://storage.googleapis.com/a1aa/image/6ece2fbb-2014-4f7a-019b-0807895fb2a2.jpg', 'Climber on rocky mountain face', 3),
  (4, 'https://storage.googleapis.com/a1aa/image/97fc85ad-fb31-4625-a494-4c2d509b75ed.jpg', 'Mountain valley with fog', 4),
  (4, 'https://storage.googleapis.com/a1aa/image/ff7490fe-43ce-4991-c390-fc3f0299589d.jpg', 'Mountain cabin with view', 5);

-- Insert sample images for Street Photography
INSERT INTO images (collection_id, url, alt_text, order)
VALUES 
  (5, 'https://storage.googleapis.com/a1aa/image/6d0350ab-05bb-4acb-1c1d-0dcecb887b36.jpg', 'Busy street market in rain', 1),
  (5, 'https://storage.googleapis.com/a1aa/image/2832d8bd-066c-49bb-b02e-ad65fd66b76a.jpg', 'Street musician performing', 2),
  (5, 'https://storage.googleapis.com/a1aa/image/6ece2fbb-2014-4f7a-019b-0807895fb2a2.jpg', 'Child playing in fountain', 3),
  (5, 'https://storage.googleapis.com/a1aa/image/97fc85ad-fb31-4625-a494-4c2d509b75ed.jpg', 'Elderly couple on park bench', 4),
  (5, 'https://storage.googleapis.com/a1aa/image/ff7490fe-43ce-4991-c390-fc3f0299589d.jpg', 'Street art on building wall', 5);
