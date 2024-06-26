DROP TABLE IF EXISTS favorite_items CASCADE;

CREATE TABLE favorite_items (
  id SERIAL PRIMARY KEY NOT NULL,
  item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
