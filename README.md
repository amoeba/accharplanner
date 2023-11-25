# AC Character Planner

Pretty complete but still sorta WIP character planner for Asheron's Call.

## Previous work:

This isn't the first skill planner for AC:

- http://www.asheronsguide.com/charbuilder.html
- http://tkissing.github.io/AsheronsSkillz/
- http://mudzereli.github.io/asheron-skillcalc/#/

## What makes this different?

- This planner calculates actual/buffed stat/vital/skill values
- This planner intends to support more of the ways you can affect your character (like sets)
  - [x] XP investment
  - [x] Buffs
  - [x] Major & minor cantrips
  - [x] Enlightenment
  - [x] Augmentations and Luminance Auras (partially done)
  - [ ] Sets
  - [ ] Temporary bonuses
    - [ ] Rares
    - [ ] Cloaks
    - [ ] Aetheria

## Development

Check out `package.json` for scripts. You probably want to `yarn install` and `yarn run serve`.

### Synchronizing with Supabase

Supabase lets you bring down local TypeScript defs for the database schema.
After any changes on the Supabase side of things, run,

```sh
npx supabase gen types typescript --project-id $SUPABASE_PROJECT_ID > utils/database-generated.types.ts
```

### Design

- Tailwind for CSS
- Lucide for Icons

## Contributing

I need feedback on:

- Layout, look & feel
- Fixing/finishing some of the more "recent" ingame features like Lum/Augs/Sets/etc
- What all should get implemented

For these things and really anything else, please open Issues on this repo.
