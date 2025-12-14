-- Add INSERT policy for profiles table
-- Users should be able to create their own profile
CREATE POLICY "Enable insert for authenticated users to create their own profile"
ON "public"."profiles"
FOR INSERT
TO "authenticated"
WITH CHECK (auth.uid() = id);
