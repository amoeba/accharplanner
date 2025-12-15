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
