
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."builds" (
    "id" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "content" "json" NOT NULL,
    "is_published" boolean DEFAULT false NOT NULL,
    "created_by" "uuid"
);

ALTER TABLE "public"."builds" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."builds_favorites" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "build_id" "text",
    "created_by" "uuid" DEFAULT "auth"."uid"()
);

ALTER TABLE "public"."builds_favorites" OWNER TO "postgres";

ALTER TABLE "public"."builds_favorites" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."builds_favorites_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."guides_favorites" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "favorited_by" "uuid" DEFAULT "auth"."uid"() NOT NULL,
    "guide_id" bigint NOT NULL
);

ALTER TABLE "public"."guides_favorites" OWNER TO "postgres";

ALTER TABLE "public"."guides_favorites" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."guide_favorites_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."guides" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "created_by" "uuid" NOT NULL,
    "content" "text" NOT NULL,
    "title" "text" NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "attribution" "text"
);

ALTER TABLE "public"."guides" OWNER TO "postgres";

ALTER TABLE "public"."guides" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."guides_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "name" "text",
    "is_admin" boolean DEFAULT false
);

ALTER TABLE "public"."profiles" OWNER TO "postgres";

ALTER TABLE ONLY "public"."builds_favorites"
    ADD CONSTRAINT "builds_favorites_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."guides_favorites"
    ADD CONSTRAINT "guide_favorites_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."guides"
    ADD CONSTRAINT "guides_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."builds"
    ADD CONSTRAINT "shared_builds_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."builds"
    ADD CONSTRAINT "builds_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."profiles"("id");

ALTER TABLE ONLY "public"."builds_favorites"
    ADD CONSTRAINT "builds_favorites_build_id_fkey" FOREIGN KEY ("build_id") REFERENCES "public"."builds"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."builds_favorites"
    ADD CONSTRAINT "builds_favorites_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."guides"
    ADD CONSTRAINT "guides_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."profiles"("id");

ALTER TABLE ONLY "public"."guides_favorites"
    ADD CONSTRAINT "guides_favorites_favorited_by_fkey" FOREIGN KEY ("favorited_by") REFERENCES "public"."profiles"("id");

ALTER TABLE ONLY "public"."guides_favorites"
    ADD CONSTRAINT "guides_favorites_guide_id_fkey" FOREIGN KEY ("guide_id") REFERENCES "public"."guides"("id");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;

CREATE POLICY "Enable delete for users based on user_id" ON "public"."builds_favorites" FOR DELETE USING (("auth"."uid"() = "created_by"));

CREATE POLICY "Enable delete for users based on user_id" ON "public"."guides_favorites" FOR DELETE TO "authenticated" USING (("auth"."uid"() = "favorited_by"));

CREATE POLICY "Enable insert access for all users" ON "public"."builds" FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."builds_favorites" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."guides" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."guides_favorites" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON "public"."builds" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."builds_favorites" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."guides" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."guides_favorites" FOR SELECT USING (true);

CREATE POLICY "Full privs if guide was made by the user" ON "public"."guides" USING (("auth"."uid"() = "created_by")) WITH CHECK (true);

CREATE POLICY "Profiles are viewable, editable, deletable by users who created" ON "public"."profiles" USING (("auth"."uid"() = "id"));

ALTER TABLE "public"."builds" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."builds_favorites" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."guides" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."guides_favorites" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;

REVOKE USAGE ON SCHEMA "public" FROM PUBLIC;
GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON TABLE "public"."builds" TO "anon";
GRANT ALL ON TABLE "public"."builds" TO "authenticated";
GRANT ALL ON TABLE "public"."builds" TO "service_role";

GRANT ALL ON TABLE "public"."builds_favorites" TO "anon";
GRANT ALL ON TABLE "public"."builds_favorites" TO "authenticated";
GRANT ALL ON TABLE "public"."builds_favorites" TO "service_role";

GRANT ALL ON SEQUENCE "public"."builds_favorites_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."builds_favorites_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."builds_favorites_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."guides_favorites" TO "anon";
GRANT ALL ON TABLE "public"."guides_favorites" TO "authenticated";
GRANT ALL ON TABLE "public"."guides_favorites" TO "service_role";

GRANT ALL ON SEQUENCE "public"."guide_favorites_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."guide_favorites_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."guide_favorites_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."guides" TO "anon";
GRANT ALL ON TABLE "public"."guides" TO "authenticated";
GRANT ALL ON TABLE "public"."guides" TO "service_role";

GRANT ALL ON SEQUENCE "public"."guides_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."guides_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."guides_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
