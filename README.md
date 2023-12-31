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

### Notes on the code

I built this over years and things are messy.
If you see something that's messy, it's probably not meant to be that way and contributions are welcome.

Types of messes you might see:

- You will see a mix of Vue2-style options API components and Vue3-style composition API components. The options API components are older and can eventually be updated to the options API.
- I never figured out how to do mapGetters/mapSetters from components to my stores.

### Formatting

This project uses ESLint and not Prettier or Volar/Vetur for formatting.
Run `npm run lint` to detect errors prior to comitting and `npm run lint:fix` to attempt to automatically fix errors.

#### Editor Setup

I use Visual Studio code and setting things up is more painful than it should be.
The trick is that with the ESLint approach I've taken, you can't use **Format on Save**.
So, to set my environmet up, I use this configuration:

```json
{
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
  },
  "eslint.validate": [
    "javascript"
  ]
}
```

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
