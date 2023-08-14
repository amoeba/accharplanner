import { createClient } from "@supabase/supabase-js";
import { merge } from "lodash";
import { createId } from "mnemonic-id";

import { Character, Build, Attribute, Vital, Skill } from "../types";
import DefaultCharacter from "./DefaultCharacter";

export default {
  async shareBuild(context: any) {
    // Reset state and clean out current shared build first
    context.state.ui.shareStatus = null;
    context.state.ui.sharedBuild = null;

    const supabase = createClient(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_KEY
    );

    // Insert build
    const { data, error } = await supabase
      .from("shared_builds")
      .insert({ id: createId(10), content: context.state.build })
      .select();

    // Handle any errors
    if (error) {
      context.state.ui.sharedStatus = "Error: " + error;
    }

    // Update state
    context.state.ui.shareStatus = null;
    if (data) {
      context.state.ui.sharedBuild = data[0]["id"];
    }
  },
  async loadRemoteBuild(context: any, options: any) {
    context.commit("addNotification", {
      type: "info",
      message: "Loading build from share link.. *portal sounds*.",
    });

    const supabase = createClient(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_KEY
    );

    // First try to find a published build, then try to find a shared build
    const response_official = await supabase
      .from("official_builds")
      .select()
      .eq("id", options.build_id);

    // Yoink .data out to make TypeScript happy
    const response_official_data = response_official.data;

    if (response_official.error) {
      context.commit("addNotification", {
        type: "error",
        message:
          "Failed to load build '" +
          options.build_id +
          "' with error '" +
          response_official.error +
          "'.",
      });

      options.router.push("/");

      return;
    }

    // Second: Try a shared build
    let response_shared_data = null;

    if (!response_official_data?.length) {
      const response_shared = await supabase
        .from("shared_builds")
        .select()
        .eq("id", options.build_id);

      // Yoink .data out again like above
      response_shared_data = response_shared.data;

      if (response_shared.error) {
        context.commit("addNotification", {
          type: "error",
          message:
            "Failed to load build '" +
            options.build_id +
            "' with error '" +
            response_shared.error +
            "'.",
        });

        options.router.push("/");

        return;
      }

      if (!response_shared_data || response_shared_data.length != 1) {
        context.commit("addNotification", {
          type: "error",
          message:
            "The build with this identifier: '" +
            options.build_id +
            "' was not found. This could either be a really bad bug or you just have a typo in your URL.",
          pinned: true,
        });

        options.router.push("/");

        return;
      }
    }

    // Take first non-null response and continue on
    const data =
      (response_official_data?.length ? response_official_data : null) ||
      (response_shared_data?.length ? response_shared_data : null);

    if (!data) {
      context.commit("addNotification", {
        type: "error",
        message:
          "The build with this identifier: '" +
          options.build_id +
          "' was not found. This could either be a really bad bug or you just have a typo in your URL.",
      });

      options.router.push("/");

      return;
    }

    const build = data[0]["content"];

    // Support old data format by looking at the structure and loading
    // accordingly. The new format has top-level keys of character and
    // stages while the old format has all the keys of the character right
    // at the top level.
    if ("character" in build) {
      // Load the character portion of the build
      const char = DefaultCharacter();
      merge(char, build.character);
      context.state.build.character = char;

      // Then populate stages
      let stages = [];

      for (let i = 0; i < build.stages.length; i++) {
        let newStage = DefaultCharacter();
        merge(newStage, build.stages[i]);
        stages.push(newStage);
      }

      context.state.build.stages = stages;

      // Change to first stage if appropriate
      if (context.state.build.stages.length > 0) {
        context.commit("changeStage", 0);
      }
    } else {
      const char = DefaultCharacter();
      merge(char, build.character);

      context.state.build.character = char;
      context.state.build.stages = [] as Character[];
    }

    context.commit("addNotification", {
      type: "success",
      message: "Successfully loaded build!",
    });

    options.router.push("/");
  },

  import(context: any, build: Build) {
    context.state.build = build;

    context.commit("addNotification", {
      type: "success",
      message: "Successfully imported build.",
    });
  },
  reorderStages(context: any, newOrder: any) {
    context.commit("reorderStages", newOrder);
  },
  changeAllInvestment(context: any, invested: string) {
    context.dispatch("changeAllAttributeInvestment", invested);
    context.dispatch("changeAllVitalInvestment", invested);
    context.dispatch("changeAllSkillInvestment", invested);
  },
  changeAllAttributeInvestment(context: any, invested: string) {
    Object.keys(Attribute).forEach((a) => {
      context.commit("updateAttributeInvested", { name: a, value: invested });
    });
  },
  changeAllVitalInvestment(context: any, invested: string) {
    Object.keys(Vital).forEach((vital) => {
      context.commit("updateVitalInvested", { name: vital, value: invested });
    });
  },
  changeAllSkillInvestment(context: any, invested: string) {
    Object.keys(Skill).forEach((skill) => {
      context.commit("updateSkillInvested", { name: skill, value: invested });
    });
  },
  changeAllBuffs(context: any, buff: string) {
    context.dispatch("changeAllAttributeBuffs", buff);
    context.dispatch("changeAllSkillBuffs", buff);
  },
  changeAllAttributeBuffs(context: any, buff: string) {
    Object.keys(Attribute).forEach((attribute) => {
      context.commit("updateAttributeBuff", { name: attribute, value: buff });
    });
  },
  changeAllSkillBuffs(context: any, buff: string) {
    Object.keys(Skill).forEach((skill) => {
      context.commit("updateSkillBuff", { name: skill, value: buff });
    });
  },
  changeAllCantrips(context: any, cantrip: string) {
    context.dispatch("changeAllAttributeCantrips", cantrip);
    context.dispatch("changeAllSkillCantrips", cantrip);
  },
  changeAllAttributeCantrips(context: any, cantrip: string) {
    Object.keys(Attribute).forEach((attribute) => {
      context.commit("updateAttributeCantrip", {
        name: attribute,
        value: cantrip,
      });
    });
  },
  changeAllSkillCantrips(context: any, cantrip: string) {
    Object.keys(Skill).forEach((skill) => {
      context.commit("updateSkillCantrip", { name: skill, value: cantrip });
    });
  },
  async publishBuild(context: any) {
    const supabase = createClient(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_KEY
    );

    const { data, error } = await supabase
      .from("official_builds")
      .insert({
        id: context.state.build.character.name
          .toLowerCase()
          .replace(/[^\w]/, "_"),
        name: context.state.build.character.name,
        description: "To be filled in...",
        content: context.state.build,
      })
      .select();

    if (error) {
      context.commit("addNotification", {
        type: "error",
        message:
          "Failed to publish build due to error: " +
          JSON.stringify(error) +
          ".",
      });
    }
  },

  // Modals
  showShareModal(context: any) {
    context.commit("setShareModalVisibility", true);
  },
  hideShareModal(context: any) {
    context.commit("setShareModalVisibility", false);
  },
  showSettingsModal(context: any) {
    context.commit("setSettingsModalVisibility", true);
  },
  hideSettingsModal(context: any) {
    context.commit("setSettingsModalVisibility", false);
  },
};
