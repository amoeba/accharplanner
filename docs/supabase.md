# Supabase Documentation

Reproducible steps for setting up a Supabase database for the planner.

## Table Definitions

TODO

## Authorization

```sql
update auth.users
set
  raw_user_meta_data = '{"is_admin": true}'
where
  email = '{email}';
```
