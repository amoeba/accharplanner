import pkg from 'lodash'
import DefaultCharacter from '~/utils/DefaultCharacter'

const { merge } = pkg

export default {
  async loadRemoteBuild(options: any) {
    const client = useSupabaseClient()

    // First try to find a published build, then try to find a shared build
    const response_official = await client
      .from('official_builds')
      .select()
      .eq('id', options.build_id)

    // Yoink .data out to make TypeScript happy
    const response_official_data = response_official.data

    if (response_official.error) {
      this.addNotification({
        type: 'error',
        message:
          `Failed to load build '${
          options.build_id
          }' with error '${
          response_official.error
          }'.`,
      })

      options.router.push('/')

      return
    }

    // Second: Try a shared build
    let response_shared_data = null

    if (!response_official_data?.length) {
      const response_shared = await client
        .from('builds')
        .select()
        .eq('id', options.build_id)

      // Yoink .data out again like above
      response_shared_data = response_shared.data

      if (response_shared.error) {
        this.addNotification({
          type: 'error',
          message:
            `Failed to load build '${
            options.build_id
            }' with error '${
            response_shared.error
            }'.`,
        })

        options.router.push('/')

        return
      }

      if (!response_shared_data || response_shared_data.length !== 1) {
        this.addNotification({
          type: 'error',
          message:
            `The build with this identifier: '${
            options.build_id
            }' was not found. This could either be a really bad bug or you just have a typo in your URL.`,
          pinned: true,
        })

        options.router.push('/')

        return
      }
    }

    // Take first non-null response and continue on
    const data
      = (response_official_data?.length ? response_official_data : null)
      || (response_shared_data?.length ? response_shared_data : null)

    if (!data) {
      this.addNotification({
        type: 'error',
        message:
          `The build with this identifier: '${
          options.build_id
          }' was not found. This could either be a really bad bug or you just have a typo in your URL.`,
      })

      options.router.push('/')

      return
    }

    const build = data[0].content

    // Support old data format by looking at the structure and loading
    // accordingly. The new format has top-level keys of character and
    // stages while the old format has all the keys of the character right
    // at the top level.
    if ('character' in build) {
      // Load the character portion of the build
      const char = DefaultCharacter()
      merge(char, build.character)
      this.build.character = char

      // Then populate stages
      const stages = []

      for (let i = 0; i < build.stages.length; i++) {
        const newStage = DefaultCharacter()
        merge(newStage, build.stages[i])
        stages.push(newStage)
      }

      this.build.stages = stages

      // Change to first stage if appropriate
      if (this.build.stages.length > 0)
        this.changeStage(0)
    }
    else {
      const char = DefaultCharacter()
      merge(char, build.character)

      this.build.character = char
      this.build.stages = [] as Character[]
    }

    this.addNotification({
      type: 'success',
      message: 'Successfully loaded build!',
    })

    options.router.push('/')
  },

  async loadBuildFromJSON(build: Build) {
    this.build = build
  },

  async loadCharacterIntoCurrentBuild(character: Character) {
    this.build.character = character
  },

  import(build: Build) {
    this.build = build

    this.addNotification({
      type: 'success',
      message: 'Successfully imported build.',
    })
  },
  async publishBuild() {
    const client = useSupabaseClient()

    const { data, error } = await client
      .from('official_builds')
      .insert({
        id: this.build.character.name.toLowerCase().replace(/[^\w]/, '_'),
        name: this.build.character.name,
        description: 'To be filled in...',
        content: this.build,
      })
      .select()

    if (error) {
      this.addNotification({
        type: 'error',
        message:
          `Failed to publish build due to error: ${
          JSON.stringify(error)
          }.`,
      })
    }
  },

  // UI
  expandAll() {
    Object.keys(this.ui.paneVisibility).forEach((p) => {
      this.ui.paneVisibility[p] = true
    })
  },
  collapseAll() {
    Object.keys(this.ui.paneVisibility).forEach((p) => {
      this.ui.paneVisibility[p] = false
    })
  },
  toggleAttributesPane() {
    this.ui.paneVisibility.attributes = !this.ui.paneVisibility.attributes
  },
  toggleSkillsPane() {
    this.ui.paneVisibility.skills = !this.ui.paneVisibility.skills
  },
  toggleAugmentationsPane() {
    this.ui.paneVisibility.augmentations
      = !this.ui.paneVisibility.augmentations
  },
  toggleAurasPane() {
    this.ui.paneVisibility.auras = !this.ui.paneVisibility.auras
  },
  toggleItemsPane() {
    this.ui.paneVisibility.items = !this.ui.paneVisibility.items
  },
  toggleArmorSetsPane() {
    this.ui.paneVisibility.armor_sets = !this.ui.paneVisibility.armor_sets
  },
  toggleBuildStagesPane() {
    this.ui.paneVisibility.buildStages = !this.ui.paneVisibility.buildStages
  },
  toggleCharacterPane() {
    this.ui.paneVisibility.character = !this.ui.paneVisibility.character
  },
  toggleXPAndLuminancePane() {
    this.ui.paneVisibility.xpAndLuminance
      = !this.ui.paneVisibility.xpAndLuminance
  },
  toggleKnobsAndDialsPane() {
    this.ui.paneVisibility.knobsAndDials
      = !this.ui.paneVisibility.knobsAndDials
  },
  toggleExtraSkillCreditsPane() {
    this.ui.paneVisibility.extraSkillCredits
      = !this.ui.paneVisibility.extraSkillCredits
  },
  changeStage(index: number) {
    // Deselect current stage if we click on it
    if (this.ui.currentStage === index) {
      this.ui.currentStage = null
      return
    }

    this.ui.currentStage = index
    this.build.character = JSON.parse(JSON.stringify(this.build.stages[index]))
  },
  saveStage() {
    this.build.stages.push(JSON.parse(JSON.stringify(this.build.character)))

    // NOTE: Don't sselect newly saved stage
    //       Leaving this commented out so I remember. If you auto-select
    //       stage, you can't just edit->save->edit->save quickly.
    // this.ui.currentStage = this.build.stages.length - 1;
  },
  deleteStage(index: number) {
    // Stop if out of bounds
    if (index > this.build.stages.length)
      return

    this.ui.currentStage = null
    this.build.stages.splice(index, 1)
  },
  reorderStages(indices: number[]) {
    const newStages: Character[] = []

    indices.forEach((i: number) => {
      newStages.push(this.build.stages[i])
    })

    this.build.stages = newStages
  },
  saveBuild() {
    // Store locally
    this.ui.savedBuilds.push({
      key: new Date().toISOString(),
      build: JSON.stringify(this.build),
    })
  },
  deleteBuild(key: string) {
    for (let i = 0; i < this.ui.savedBuilds.length; i++) {
      if (this.ui.savedBuilds[i].key === key)
        this.ui.savedBuilds.splice(i, 1)
    }
  },
  deleteAllBuilds() {
    this.ui.savedBuilds = []
  },
  reset() {
    this.build.character = DefaultCharacter()
    this.build.stages = []
  },
  updateName(value: string) {
    this.build.character.name = value
  },
  updateLevel(value: number) {
    this.build.character.level = Number(value)
  },
  updateRace(value: Race) {
    this.build.character.race = value

    // Also update experience augmentations to match new race
    if (
      value === Race.Aluvian
      || value === Race['Gharu\'ndim']
      || value === Race.Sho
      || value === Race.Viamontian
    ) {
      this.build.character.augmentations.jack_of_all_trades.invested = 1
      this.build.character.augmentations.infused_life_magic.invested = 0
      this.build.character.augmentations.eye_of_the_remorseless.invested = 0
      this.build.character.augmentations.might_of_the_seventh_mule.invested = 0
      this.build.character.augmentations.hand_of_the_remorseless.invested = 0
    }
    else if (value === Race.Empyrean) {
      this.build.character.augmentations.jack_of_all_trades.invested = 0
      this.build.character.augmentations.infused_life_magic.invested = 1
      this.build.character.augmentations.eye_of_the_remorseless.invested = 0
      this.build.character.augmentations.might_of_the_seventh_mule.invested = 0
      this.build.character.augmentations.hand_of_the_remorseless.invested = 0
    }
    else if (value === Race.Umbraen || value === Race.Penumbraen) {
      this.build.character.augmentations.jack_of_all_trades.invested = 0
      this.build.character.augmentations.infused_life_magic.invested = 0
      this.build.character.augmentations.eye_of_the_remorseless.invested = 1
      this.build.character.augmentations.might_of_the_seventh_mule.invested = 0
      this.build.character.augmentations.hand_of_the_remorseless.invested = 0
    }
    else if (value === Race.Lugian) {
      this.build.character.augmentations.jack_of_all_trades.invested = 0
      this.build.character.augmentations.infused_life_magic.invested = 0
      this.build.character.augmentations.eye_of_the_remorseless.invested = 0
      this.build.character.augmentations.might_of_the_seventh_mule.invested = 1
      this.build.character.augmentations.hand_of_the_remorseless.invested = 0
    }
    else if (value === Race.Tumerok) {
      this.build.character.augmentations.jack_of_all_trades.invested = 0
      this.build.character.augmentations.infused_life_magic.invested = 0
      this.build.character.augmentations.eye_of_the_remorseless.invested = 0
      this.build.character.augmentations.might_of_the_seventh_mule.invested = 0
      this.build.character.augmentations.hand_of_the_remorseless.invested = 1
    }
  },
  updateGender(value: Gender) {
    this.build.character.gender = value
  },

  updateTimesEnlightened(value: number) {
    let actual = Number(value)

    if (Number.isNan(actual))
      actual = 0
    else if (actual < 0)
      actual = 0
    else if (actual > 5)
      actual = 5

    this.build.character.timesEnlightened = actual
  },

  updateExtraSkillCredit(payload: any) {
    this.build.character.extraSkillCredits[payload.name] = payload.value

    // Set luminance aura skill points to match
    if (payload.name === 'luminance1' || payload.name === 'luminance2') {
      this.build.character.luminance_auras.skill.invested
        = this.build.character.extraSkillCredits.luminance1
        + this.build.character.extraSkillCredits.luminance2
    }
  },

  updateItem(payload: any) {
    this.build.character.items[payload.id] = payload.value
  },
  updateArmorSet(payload: any) {
    this.build.character.armor_sets[payload.id].equipped = payload.value
  },
  updateAttributeCreation(payload: any) {
    let newVal = Number(payload.value)

    // Clamp to be from 10-100
    if (newVal > 100)
      newVal = 100
    else if (newVal < 10)
      newVal = 10

    // Ensure we haven't spent more than we can and adjust other
    // attributes if needed
    const newSpent = Object.keys(Attribute)
      .map((a) => {
        // Don't count old value for the attribute we're changing, use the new
        // value
        if (a === payload.name)
          return newVal
        else return this.build.character.attributes[a].creation
      })
      .reduce((a, v) => {
        return a + v
      })

    // Use this to iterate over the other attributes we're lowering by name
    const names = Object.keys(Attribute).filter(v => v !== payload.name)

    const maxAttributePoints
      = MAX_CREATION_ATTRIBUTE_TOTAL_POINTS
      + this.build.character.augmentations.reinforcement_of_the_lugians.invested
      * 5
      + this.build.character.augmentations.bleearghs_fortitude.invested * 5
      + this.build.character.augmentations.oswalds_enhancement.invested * 5
      + this.build.character.augmentations.siraluuns_blessing.invested * 5
      + this.build.character.augmentations.enduring_calm.invested * 5
      + this.build.character.augmentations.steadfast_will.invested * 5

    if (newSpent > maxAttributePoints) {
      let extra = newSpent - maxAttributePoints

      for (let i = 0; i < extra; i++) {
        // Don't reduce attributes below 10. Adding 1 to `extra` ensures
        // we iterate long enough to lower everything as much as is needed
        if (this.build.character.attributes[names[i % 4]].creation <= 10) {
          extra += 1
          continue
        }

        this.build.character.attributes[names[i % 4]].creation -= 1
      }
    }

    this.build.character.attributes[payload.name].creation = newVal
  },

  updateAttributeInvested(payload: any) {
    let newval

    if (this.settings.infiniteMode)
      newval = Number(payload.value)
    else newval = Math.min(Number(payload.value), MAX_ATTRIBUTE_INVESTED)

    this.build.character.attributes[payload.name].invested = newval
  },

  updateAttributeBuff(payload: any) {
    this.build.character.attributes[payload.name].buff = Number(payload.value)
  },

  updateAttributeCantrip(payload: any) {
    this.build.character.attributes[payload.name].cantrip = Number(
      payload.value,
    )
  },

  updateVitalInvested(payload: any) {
    let newval

    if (this.settings.infiniteMode)
      newval = Number(payload.value)
    else newval = Math.min(Number(payload.value), MAX_VITAL_INVESTED)

    this.build.character.vitals[payload.name].invested = newval
  },

  updateSkillInvested(payload: { name: string, value: number }) {
    const skill = this.build.character.skills[payload.name]

    if (this.settings.infiniteMode) {
      skill.invested = Number(payload.value)
    }
    else {
      const max = maxSkillInvested(skill.training)
      skill.invested = Math.min(Number(payload.value), max)
    }
  },

  updateSkillBuff(payload: any) {
    this.build.character.skills[payload.name].buff = Number(payload.value)
  },

  updateSkillCantrip(payload: any) {
    this.build.character.skills[payload.name].cantrip = Number(payload.value)
  },

  increaseTraining(skill: Skill) {
    const currentTraining = this.build.character.skills[skill].training
    let newTraining = null

    switch (currentTraining) {
      case Training.UNUSABLE:
        newTraining = Training.TRAINED
        break
      case Training.UNTRAINED:
        newTraining = Training.TRAINED
        break
      case Training.TRAINED:
        newTraining = Training.SPECIALIZED
        break
      default:
        return
    }

    this.build.character.skills[skill].training = newTraining
  },

  decreaseTraining(skill: Skill) {
    const currentTraining = this.build.character.skills[skill].training
    let newTraining = null

    switch (currentTraining) {
      case Training.SPECIALIZED:
        newTraining = Training.TRAINED

        // Stop now if in infinite mode
        if (this.settings.infiniteMode)
          break

        // Reduce max skill invested to 208 (max for trained) if over
        if (
          this.build.character.skills[skill].invested
            > MAX_SKILL_INVESTED_TRAINED
        ) {
          this.build.character.skills[skill].invested
            = MAX_SKILL_INVESTED_TRAINED
        }

        break
      case Training.TRAINED:
        newTraining = UNTRAINED_STATE[skill]
        this.build.character.skills[skill].invested = 0

        break
      default:
        return
    }

    this.build.character.skills[skill].training = newTraining
  },

  // Augmentations
  updateAugmentationInvested(payload: any) {
    /*
      Update Attributes

      The basic idea here is that changing an attribute augmentation direclty
      just boosts your total available attribute points, up to a maximum of
      380 (330 + 50, 5 uses of +10 points). How I used to do this was add each
      attribute augmentation directly into the base value for each attribute.
      This produced a correct value _until_ the player went through attribute
      redistribution. Using the attribute redistribution quest, a player can do
      something like get 5 endurance augmentations and later redistribute those
      bonus attribute points to another attribute.

      To simulate what it was like when a player initial gained an attribute
      augmentation, we attempt to boost the attribute's base value as a side
      effect of this mutation.

      We do this before updating state so we can calculate the difference.
    */

    if (payload.name === Augmentation.reinforcement_of_the_lugians) {
      updateAugmentationInvestedSideEffect(state, payload, Attribute.strength)
    }
    else if (payload.name === Augmentation.bleearghs_fortitude) {
      updateAugmentationInvestedSideEffect(state, payload, Attribute.endurance)
    }
    else if (payload.name === Augmentation.oswalds_enhancement) {
      updateAugmentationInvestedSideEffect(
        state,
        payload,
        Attribute.coordination,
      )
    }
    else if (payload.name === Augmentation.siraluuns_blessing) {
      updateAugmentationInvestedSideEffect(state, payload, Attribute.quickness)
    }
    else if (payload.name === Augmentation.enduring_calm) {
      updateAugmentationInvestedSideEffect(state, payload, Attribute.focus)
    }
    else if (payload.name === Augmentation.steadfast_will) {
      updateAugmentationInvestedSideEffect(state, payload, Attribute.self)
    }

    this.build.character.augmentations[payload.name].invested = Number(
      payload.value,
    )

    /* Update skills */
    if (payload.name === Augmentation.jibrils_essence) {
      this.build.character.skills.armor_tinkering.training
        = Training.SPECIALIZED
    }
    else if (payload.name === Augmentation.yoshis_essence) {
      this.build.character.skills.item_tinkering.training
        = Training.SPECIALIZED
    }
    else if (payload.name === Augmentation.celdiseths_essence) {
      this.build.character.skills.magic_item_tinkering.training
        = Training.SPECIALIZED
    }
    else if (payload.name === Augmentation.kogas_essence) {
      this.build.character.skills.weapon_tinkering.training
        = Training.SPECIALIZED
    }
    else if (payload.name === Augmentation.ciandras_essence) {
      this.build.character.skills.salvaging.training = Training.SPECIALIZED
    }
  },

  changeAllAugmentationInvestment(value: number) {
    AUGMENTATIONS.forEach((aug_name: string) => {
      this.build.character.augmentations[aug_name].invested
        = (value === 1 ? AUGMENTATION_MAX_USES[aug_name] : 0)
    })
  },

  // Luminance Auras
  updateLuminanceAuraInvested(payload: any) {
    this.build.character.luminance_auras[payload.name].invested = Number(
      payload.value,
    )
  },

  changeAllLuminanceAuraInvestment(value: any) {
    LUMINANCE_AURAS.forEach((aura_name: string) => {
      this.build.character.luminance_auras[aura_name].invested
        = value === 1 ? LUMINANCE_AURA_MAX_USES[aura_name] : 0
    })
  },

  changeAllInvestment(invested: string) {
    Object.keys(Attribute).forEach((a) => {
      let newval = Number(invested)
      newval = newval > 190 ? 190 : newval

      this.build.character.attributes[a].invested = newval
    })

    Object.keys(Vital).forEach((a) => {
      let newval = Number(invested)
      newval = newval > 196 ? 196 : newval

      this.build.character.vitals[a].invested = newval
    })

    Object.keys(Skill).forEach((skill) => {
      const newval = Number(invested)

      if (this.build.character.skills[skill].training === Training.SPECIALIZED) {
        this.build.character.skills[skill].invested
          = newval > MAX_SKILL_INVESTED_SPECIALIZED
            ? MAX_SKILL_INVESTED_SPECIALIZED
            : newval
      }
      else if (
        this.build.character.skills[skill].training === Training.TRAINED
      ) {
        this.build.character.skills[skill].invested
          = newval > MAX_SKILL_INVESTED_TRAINED
            ? MAX_SKILL_INVESTED_TRAINED
            : newval
      }
    })
  },

  changeAllAttributeInvestment(invested: string) {
    Object.keys(Attribute).forEach((a) => {
      const newval = Number(invested)

      this.build.character.attributes[a].invested = newval
    })
  },

  changeAllVitalInvestment(invested: string) {
    Object.keys(Vital).forEach((a) => {
      const newval = Number(invested)

      this.build.character.vitals[a].invested = newval
    })
  },

  changeAllSkillInvestment(invested: string) {
    Object.keys(Skill).forEach((skill) => {
      let newval = Number(invested)

      if (
        this.build.character.skills[skill].training === Training.SPECIALIZED
      ) {
        newval
          = newval > MAX_SKILL_INVESTED_SPECIALIZED
            ? MAX_SKILL_INVESTED_SPECIALIZED
            : newval
      }
      else if (
        this.build.character.skills[skill].training === Training.TRAINED
      ) {
        newval
          = newval > MAX_SKILL_INVESTED_TRAINED
            ? MAX_SKILL_INVESTED_TRAINED
            : newval
      }
      else {
        newval = 0
      }

      this.build.character.skills[skill].invested = newval
    })
  },

  changeAllBuffs(buff: string) {
    Object.keys(Attribute).forEach((attribute) => {
      this.build.character.attributes[attribute].buff = Number(buff)
    })

    Object.keys(Skill).forEach((skill) => {
      this.build.character.skills[skill].buff = Number(buff)
    })
  },

  changeAllAttributeBuffs(buff: string) {
    Object.keys(Attribute).forEach((attribute) => {
      this.build.character.attributes[attribute].buff = Number(buff)
    })
  },

  changeAllSkillBuffs(buff: string) {
    Object.keys(Skill).forEach((skill) => {
      this.build.character.skills[skill].buff = Number(buff)
    })
  },

  // Cantrips
  changeAllCantrips(cantrip: string) {
    Object.keys(Attribute).forEach((attribute) => {
      this.build.character.attributes[attribute].cantrip = Number(cantrip)
    })

    Object.keys(Skill).forEach((skill) => {
      this.build.character.skills[skill].cantrip = Number(cantrip)
    })
  },

  changeAllAttributeCantrips(cantrip: string) {
    Object.keys(Attribute).forEach((attribute) => {
      this.build.character.attributes[attribute].cantrip = Number(cantrip)
    })
  },

  changeAllSkillCantrips(cantrip: string) {
    Object.keys(Skill).forEach((skill) => {
      this.build.character.skills[skill].cantrip = Number(cantrip)
    })
  },

  // Notifications
  clearAllNotifications() {
    this.ui.notifications = []
  },

  addNotification(payload: any) {
    const notification_id = Date.now()

    this.ui.notifications.push({
      id: notification_id,
      type: payload.type,
      message: payload.message,
    })

    if (payload.pinned)
      return

    setTimeout(() => {
      for (let i = 0; i < this.ui.notifications.length; i++) {
        if (this.ui.notifications[i].id === notification_id)
          this.ui.notifications.splice(i, 1)
      }
    }, 3000)
  },

  removeNotification(id: number) {
    for (let i = 0; i < this.ui.notifications.length; i++) {
      if (this.ui.notifications[i].id === id)
        this.ui.notifications.splice(i, 1)
    }
  },

  // Modals
  setShareModalVisibility(value: boolean) {
    this.ui.modalVisibility.share = value
  },

  setSettingsModalVisibility(value: boolean) {
    this.ui.modalVisibility.settings = value
  },

  // Settings
  updateSettingsInfiniteMode(value: boolean) {
    this.settings.infiniteMode = value

    // Reset level back to within 1-275
    this.build.character.level = Math.min(
      this.build.character.level,
      MAX_LEVEL,
    )
  },

  // Auth
  updateIsLoggedIn(value: boolean) {
    this.auth.isLoggedIn = value
  },
  updateIsAdmin(value: boolean) {
    this.auth.isAdmin = value
  },
}
