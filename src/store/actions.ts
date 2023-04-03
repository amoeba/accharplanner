import { createClient } from "@supabase/supabase-js";
import { merge } from "lodash";
import { createId } from "mnemonic-id";

import { Character, Build, Attribute, Vital } from "../types";
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

    const { data, error } = await supabase
      .from("shared_builds")
      .select()
      .eq("id", options.build_id);

    if (error) {
      context.commit("addNotification", {
        type: "error",
        message:
          "Failed to load build '" +
          options.build_id +
          "' with error '" +
          error +
          "'.",
      });

      options.router.push("/");

      return;
    }

    if (!data || data.length != 1) {
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

      for (let i = 1; i < build.stages.length; i++) {
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
    context.commit("changeAllSkillInvestment", invested);
  },
  changeAllAttributeInvestment(context: any, invested: string) {
    Object.keys(Attribute).forEach(a => {
      context.commit("updateAttributeInvested", {name: a, value: invested});
    });
  },
  changeAllVitalInvestment(context: any, invested: string) {
    Object.keys(Vital).forEach(vital => {
      context.commit("updateVitalInvested", {name: vital, value: invested});
    });
  },
  changeAllBuffs(context: any, buff: string) {
    context.commit("changeAllAttributeBuffs", buff);
    context.commit("changeAllSkillBuffs", buff);
  },
  changeAllCantrips(context: any, cantrip: string) {
    context.commit("changeAllAttributeCantrips", cantrip);
    context.commit("changeAllSkillCantrips", cantrip);
  },
};
