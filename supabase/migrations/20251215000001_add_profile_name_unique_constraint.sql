-- Add unique constraint to profile name
-- This ensures that no two users can have the same profile name

-- First, ensure there are no duplicate names in the existing data
-- If there are duplicates, this migration will fail and you'll need to clean them up first

ALTER TABLE "public"."profiles"
ADD CONSTRAINT "profiles_name_unique" UNIQUE ("name");

-- Add a partial unique index that only applies to non-null names
-- This allows multiple NULL values but ensures non-null names are unique
DROP CONSTRAINT IF EXISTS "profiles_name_unique";

CREATE UNIQUE INDEX "profiles_name_unique" ON "public"."profiles" ("name") WHERE ("name" IS NOT NULL);

-- Add a CHECK constraint to enforce safe username characters
-- Usernames must:
-- - Be 3-20 characters long
-- - Start with a letter or number
-- - Contain only letters, numbers, hyphens, and underscores
-- - No spaces, special characters, or emojis allowed
ALTER TABLE "public"."profiles"
ADD CONSTRAINT "profiles_name_safe_chars"
CHECK (
  name IS NULL OR
  (
    name ~ '^[a-zA-Z0-9][a-zA-Z0-9_-]{2,19}$' AND
    length(name) >= 3 AND
    length(name) <= 20
  )
);
